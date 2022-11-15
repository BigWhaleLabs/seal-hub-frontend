import resolveNetworkForEtherscan from 'helpers/resolveNetworkForEtherscan'

export default function (txHash: string, network: string) {
  return `https://${resolveNetworkForEtherscan(
    network
  )}goerli.etherscan.io/tx/${txHash}`
}
