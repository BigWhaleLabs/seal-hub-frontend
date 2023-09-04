import { ErrorType } from 'models/ErrorType'
import { Signer } from 'ethers'
import { getMessage } from '@big-whale-labs/seal-hub-kit'
import { WalletClient } from 'wagmi'

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
