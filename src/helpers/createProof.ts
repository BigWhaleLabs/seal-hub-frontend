import * as snarkjs from 'snarkjs'
import { hashPersonalMessage } from '@ethereumjs/util'
import { utils } from 'ethers'
import BN from 'bn.js'
import ProofResult from 'models/ProofResult'
import elliptic from 'elliptic'

const ec = new elliptic.ec('secp256k1')
const STRIDE = 8n
const NUM_STRIDES = 256n / STRIDE // = 32
const REGISTERS = 4n

const SECP256K1_N = new BN(
  'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141',
  16
)

const addHexPrefix = (str: string) => `0x${str}`

interface ExtendedBasePoint extends elliptic.curve.base.BasePoint {
  x: BN
  y: BN
}

const splitToRegisters = (value?: BN | string) => {
  const registers = [] as bigint[]

  if (!value) {
    return [0n, 0n, 0n, 0n]
  }
  const hex =
    typeof value === 'string' ? value : value.toString('hex').padStart(64, '0')
  for (let k = 0; k < REGISTERS; k++) {
    // 64bit = 16 chars in hex
    const val = hex.slice(k * 16, (k + 1) * 16)

    registers.unshift(BigInt(addHexPrefix(val)))
  }

  return registers.map((el) => el.toString())
}

const getPointPreComputes = (point: ExtendedBasePoint) => {
  const keyPoint = ec.keyFromPublic({
    x: Buffer.from(point.x.toString(16), 'hex').toString('hex'),
    y: Buffer.from(point.y.toString(16), 'hex').toString('hex'),
  })

  const gPowers = [] as (bigint[] | string[])[][][]
  for (let i = 0n; i < NUM_STRIDES; i++) {
    const stride: (bigint[] | string[])[][] = []
    const power = 2n ** (i * STRIDE)
    for (let j = 0n; j < 2n ** STRIDE; j++) {
      const l = j * power

      const gPower = keyPoint
        .getPublic()
        .mul(new BN(l.toString())) as ExtendedBasePoint
      const x = splitToRegisters(gPower.x)
      const y = splitToRegisters(gPower.y)
      stride.push([x, y])
    }
    gPowers.push(stride)
  }

  return gPowers
}

function generateInput(signature: string, message: string) {
  const msgHash = hashPersonalMessage(Buffer.from(message))
  const { r, s, v } = utils.splitSignature(signature)
  const isYOdd = (v - 27) % 2

  const bnR = new BN(BigInt(r).toString())

  const rPoint = ec.keyFromPublic(
    ec.curve.pointFromX(bnR, isYOdd).encode('hex'),
    'hex'
  )
  const rInv = bnR.invm(SECP256K1_N)
  const w = rInv.mul(new BN(msgHash)).neg().umod(SECP256K1_N)
  const U = ec.curve.g.mul(w)
  const T = rPoint.getPublic().mul(rInv) as ExtendedBasePoint
  const TPreComputes = getPointPreComputes(T)

  return {
    TPreComputes,
    U: [splitToRegisters(U.x), splitToRegisters(U.y)],
    s: [splitToRegisters(Buffer.from(s).toString('hex'))],
  }
}

export default function build(
  signature: string,
  message: string
): Promise<ProofResult> {
  return snarkjs.groth16.fullProve(
    generateInput(signature, message),
    '/zk/ECDSAChecker.wasm',
    '/zk/ECDSAChecker_final.zkey'
  )
}