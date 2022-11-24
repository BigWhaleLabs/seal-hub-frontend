import { ErrorType } from 'models/ErrorType'
import { Signer } from 'ethers'
import { createMessage } from '@big-whale-labs/seal-hub-kit'

export default async function (address: string, signer: Signer) {
  try {
    const baseMessage = createMessage(address)
    const signature = await signer.signMessage(baseMessage)

    return { baseMessage, signature }
  } catch (e) {
    console.error(e)
    throw { type: ErrorType.signature, error: e }
  }
}
