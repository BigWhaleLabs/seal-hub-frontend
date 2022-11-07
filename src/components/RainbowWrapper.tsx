import { Context, WagmiConfig, useAccount, useEnsName, useNetwork } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { chainList, wagmiClient } from 'types/wagmiClient'
import ChildrenProp from 'models/ChildrenProp'

function Content({ children }: ChildrenProp) {
  const { isConnected: connected, address } = useAccount()
  const { chain } = useNetwork()
  const chainId = chain?.id
  const { isLoading, data: name = null } =
    connected && chainId
      ? useEnsName({
          chainId: chainId,
          address,
        })
      : { isLoading: true }

  return (
    <Context.Provider
      value={{
        address,
        connected,
        name,
        chainId,
        isLoading,
        ownsToken: connected,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default function ({ children }: ChildrenProp) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chainList} theme={darkTheme()}>
        <Content>{children}</Content>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
