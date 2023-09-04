import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { chainList, wagmiConfig } from 'helpers/wagmiClient'
import ChildrenProp from 'models/ChildrenProp'

export default function ({ children }: ChildrenProp) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chainList} theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
