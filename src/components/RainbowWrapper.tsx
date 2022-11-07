import {
  Web3ModalProvider,
  useAccount,
  useFetchEnsName,
} from '@web3modal/react'
import { modalConfig, wagmiClient } from 'types/Web3Config'
import ChildrenProp from 'models/ChildrenProp'
import WalletContext from 'helpers/WalletContext'

function Content({ children }: ChildrenProp) {
  const { connected, address, chainId } = useAccount()
  const { isLoading, name } = connected
    ? useFetchEnsName({
        chainId,
        address,
      })
    : { isLoading: true, name: null }

  return (
    <WalletContext.Provider
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
    </WalletContext.Provider>
  )
}

export default function ({ children }: ChildrenProp) {
  return (
    <Web3ModalProvider config={modalConfig} ethereumClient={wagmiClient}>
      <Content>{children}</Content>
    </Web3ModalProvider>
  )
}
