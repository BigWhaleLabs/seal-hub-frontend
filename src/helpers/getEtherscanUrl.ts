import resolveNetworkForEtherscan from 'helpers/resolveNetworkForEtherscan'

export default function ({
  chainId,
  type,
  value,
}: {
  chainId: number
  type: 'address' | 'tx'
  value: string
}) {
  return `${resolveNetworkForEtherscan(chainId)}/${type}/${value}`
}
