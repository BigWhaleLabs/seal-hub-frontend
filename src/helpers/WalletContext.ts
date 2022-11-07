import { createContext } from 'preact'

export default createContext<{
  address?: string | null
  connected: boolean
  name?: string | null
  chainId: string
  isLoading: boolean
  ownsToken: boolean
}>({
  address: undefined,
  connected: false,
  name: undefined,
  chainId: 'mainnet',
  isLoading: false,
  ownsToken: false,
})
