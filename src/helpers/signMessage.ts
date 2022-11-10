import { Signer } from 'ethers'
import { hashPersonalMessage } from '@ethereumjs/util'

export default async function (address: string, signer: Signer) {
  const baseMessage = `SealHub verification for ${address}`
  const messageHash = hashPersonalMessage(Buffer.from(baseMessage))
  const signature = await signer.signMessage(messageHash)

  return { baseMessage, signature }
}
