import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { SealHub__factory } from '@big-whale-labs/seal-hub-contract'
import { Wallet } from 'ethers'
import defaultProvider from 'helpers/defaultProvider'
import env from 'helpers/env'
import relayProvider from 'helpers/relayProvider'

export default async function () {
  const wallet = Wallet.createRandom()

  const gsnProvider = await relayProvider(defaultProvider)
  gsnProvider.addAccount(wallet.privateKey)

  const etherProvider = new Web3Provider(
    gsnProvider as unknown as ExternalProvider
  )

  return SealHub__factory.connect(
    env.VITE_SEAL_HUB,
    etherProvider.getSigner(wallet.address)
  )
}
