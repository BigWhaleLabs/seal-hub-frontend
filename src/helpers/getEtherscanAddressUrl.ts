import resolveNetworkForEtherscan from 'helpers/resolveNetworkForEtherscan'

export default function (address: string, network: string) {
  return `https://${resolveNetworkForEtherscan(
    network
  )}etherscan.io/address/${address}`
}
