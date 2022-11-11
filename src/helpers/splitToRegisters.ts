/* eslint-disable no-relative-import-paths/no-relative-import-paths */
import BN from 'bn.js'
import addHexPrefix from '../helpers/addHexPrefix'

const REGISTERS = 4n

export default function splitToRegisters(value?: BN | string) {
  const registers = [] as bigint[]

  if (!value) {
    return [0n, 0n, 0n, 0n]
  }
  const hex = value.toString('hex').padStart(64, '0')
  for (let k = 0; k < REGISTERS; k++) {
    // 64bit = 16 chars in hex
    const val = hex.slice(k * 16, (k + 1) * 16)

    registers.unshift(BigInt(addHexPrefix(val)))
  }

  return registers.map((el) => el.toString())
}
