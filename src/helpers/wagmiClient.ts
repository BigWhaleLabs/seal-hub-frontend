import { alchemyProvider } from 'wagmi/providers/alchemy'
import { chain, configureChains, createClient } from 'wagmi'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { publicProvider } from 'wagmi/providers/public'
import env from 'helpers/env'

const { chains, provider } = configureChains(
  [chain.mainnet],
  [alchemyProvider({ apiKey: env.VITE_ALCHEMY_API_KEY }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'SealHub',
  chains,
})

export const chainList = chains

export const wagmiClient = createClient({
  connectors,
  provider,
})
