/* eslint-disable no-relative-import-paths/no-relative-import-paths */
// Used by worker, which accepts only absolute paths, you can use this function as usual
import { BigIntOrString } from '../models/BigIntOrString'
import { Buffer } from 'buffer'
import { hashPersonalMessage } from '@ethereumjs/util'
import { utils } from 'ethers'
import BN from 'bn.js'
import elliptic from 'elliptic'
import splitToRegisters from '../helpers/splitToRegisters'

const ec = new elliptic.ec('secp256k1')
const STRIDE = 8n
const NUM_STRIDES = 256n / STRIDE // = 32

const SECP256K1_N = new BN(
  'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141',
  16
)

interface ExtendedBasePoint extends elliptic.curve.base.BasePoint {
  x: BN
  y: BN
}

const getPointPreComputes = (point: ExtendedBasePoint) => {
  const keyPoint = ec.keyFromPublic({
    x: Buffer.from(point.x.toString(16), 'hex').toString('hex'),
    y: Buffer.from(point.y.toString(16), 'hex').toString('hex'),
  })

  const gPowers = [] as BigIntOrString[][][][]
  for (let i = 0n; i < NUM_STRIDES; i++) {
    const stride: BigIntOrString[][][] = []
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

export function generateInput(signature: string, message: string) {
  const msgHash = hashPersonalMessage(Buffer.from(message))
  const { v, r, s } = utils.splitSignature(signature)

  const biV = BigInt(v)
  const biR = new BN(r.slice(2, r.length), 'hex')
  const hexS = s.slice(2, s.length)

  const isYOdd = (biV - BigInt(27)) % BigInt(2)
  const rPoint = ec.keyFromPublic(
    ec.curve.pointFromX(new BN(biR), isYOdd).encode('hex'),
    'hex'
  )

  // Get the group element: -(m * r^−1 * G)
  const rInv = new BN(biR).invm(SECP256K1_N)

  // w = -(r^-1 * msg)
  const w = rInv.mul(new BN(msgHash)).neg().umod(SECP256K1_N)
  // U = -(w * G) = -(r^-1 * msg * G)
  const U = ec.curve.g.mul(w)

  // T = r^-1 * R
  const T = rPoint.getPublic().mul(rInv) as ExtendedBasePoint

  const TPreComputes = getPointPreComputes(T)

  return {
    TPreComputes,
    U: [splitToRegisters(U.x), splitToRegisters(U.y)],
    s: [splitToRegisters(hexS)],
  }
}

export default generateInput
