import { Web3ModalEthereum } from '@web3modal/ethereum'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { chain, configureChains, createClient } from '@wagmi/core'
import env from 'helpers/env'
import type { ConfigOptions } from '@web3modal/react'

const WC_PROJECT_ID = env.VITE_WC_PROJECT_ID
const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    alchemyProvider({
      apiKey: env.VITE_ALCHEMY_API_KEY,
    }),
  ]
)
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: Web3ModalEthereum.defaultConnectors({
    chains,
    appName: 'web3Modal',
  }),
  provider,
})
export const modalConfig: ConfigOptions = {
  projectId: WC_PROJECT_ID,
  theme: 'dark',
  accentColor: 'blackWhite',
}
