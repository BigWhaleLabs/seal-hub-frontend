import { Signer } from 'ethers'
import { hashPersonalMessage } from '@ethereumjs/util'
import buffer from 'buffer'

const { Buffer } = buffer
if (!window.Buffer) window.Buffer = Buffer

export default async function (address: string, signer: Signer) {
  const baseMessage = `SealHub verification for ${address}`
  const messageHash = hashPersonalMessage(Buffer.from(baseMessage))
  const signature = await signer.signMessage(messageHash)

  return { baseMessage, signature }
}
