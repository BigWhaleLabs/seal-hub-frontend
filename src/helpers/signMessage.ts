import { ErrorType } from 'models/ErrorType'
import { Signer } from 'ethers'
import { getMessage } from '@big-whale-labs/seal-hub-kit'

export default async function (signer: Signer) {
  try {
    const baseMessage = getMessage()
    const signature = await signer.signMessage(baseMessage)

    return { baseMessage, signature }
  } catch (e) {
    console.error(e)
    throw { error: e, type: ErrorType.signature }
  }
}
