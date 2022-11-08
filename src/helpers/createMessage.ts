import { utils } from 'ethers'
import Mimc7 from 'models/Mimc7'

export default async function (message: string) {
  const messageBytes = utils.toUtf8Bytes(message)
  const mimc7 = await new Mimc7().prepare()

  return mimc7.hashWithoutBabyJub(messageBytes)
}
