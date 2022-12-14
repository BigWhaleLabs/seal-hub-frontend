import { chain, configureChains, createClient } from 'wagmi'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import env from 'helpers/env'

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: env.VITE_ETH_RPC,
      }),
    }),
    publicProvider(),
  ]
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
