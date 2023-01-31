import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { Provider } from '@ethersproject/abstract-provider'
import { Wallet } from 'ethers'
import { connectSealHub } from '@big-whale-labs/seal-hub-kit'
import defaultProvider from 'helpers/defaultProvider'
import relayProvider from 'helpers/relayProvider'

export default async function () {
  const wallet = Wallet.createRandom()

  const gsnProvider = await relayProvider(defaultProvider)
  gsnProvider.addAccount(wallet.privateKey)

  const etherProvider = new Web3Provider(
    gsnProvider as unknown as ExternalProvider
  )

  return connectSealHub(
    etherProvider.getSigner(wallet.address) as unknown as Provider
  )
}
