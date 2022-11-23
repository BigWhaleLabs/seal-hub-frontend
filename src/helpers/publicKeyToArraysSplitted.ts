import BN from 'bn.js'
import addHexPrefix from 'helpers/addHexPrefix'
import splitToRegisters from 'helpers/splitToRegisters'

export default function (publicKey: string) {
  const x = splitToRegisters(
    new BN(BigInt(addHexPrefix(publicKey.slice(4, 4 + 64))).toString())
  )
  const y = splitToRegisters(
    new BN(BigInt(addHexPrefix(publicKey.slice(68, 68 + 64))).toString())
  )

  return [x, y]
}
