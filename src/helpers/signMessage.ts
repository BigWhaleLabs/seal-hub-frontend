import { ErrorType } from 'models/ErrorType'
import { WalletClient } from 'wagmi'
import { getMessage } from '@big-whale-labs/seal-hub-kit'

export default async function (signer: WalletClient) {
  try {
    const baseMessage = getMessage()
    const signature = await signer.signMessage({ message: baseMessage })

    return { baseMessage, signature }
  } catch (e) {
    console.error(e)
    throw { error: e, type: ErrorType.signature }
  }
}
