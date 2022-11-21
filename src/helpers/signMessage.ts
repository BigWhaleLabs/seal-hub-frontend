import { ErrorType } from 'models/ErrorType'
import { Signer } from 'ethers'

export default async function (address: string, signer: Signer) {
  try {
    const baseMessage = `SealHub verification for ${address}`
    const signature = await signer.signMessage(baseMessage)

    return { baseMessage, signature }
  } catch (e) {
    console.error(e)
    throw { type: ErrorType.SIGNATURE, error: e }
  }
}
