import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { chainList, wagmiClient } from 'types/wagmiClient'
import ChildrenProp from 'models/ChildrenProp'

export default function ({ children }: ChildrenProp) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chainList} theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
