import { Signer } from 'ethers'

export default async function (address: string, signer: Signer) {
  const baseMessage = `SealHub verification for ${address}`
  const signature = await signer.signMessage(baseMessage)

  return { baseMessage, signature }
}
