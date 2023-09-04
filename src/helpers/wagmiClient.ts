import { configureChains, createConfig } from 'wagmi'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import env from 'helpers/env'

const { chains, publicClient } = configureChains(
  [mainnet],
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
  projectId: env.VITE_WALLETCONNECT_PROJECT_ID,
})

export const chainList = chains

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
