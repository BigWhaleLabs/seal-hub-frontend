import { configureChains, createClient } from 'wagmi'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { goerli } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import env from 'helpers/env'

const { chains, provider } = configureChains(
  [goerli],
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
  autoConnect: true,
  connectors,
  provider,
})
