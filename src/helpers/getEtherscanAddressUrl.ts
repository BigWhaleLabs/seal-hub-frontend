export default function (address: string, network: string) {
  return `https://${
    network === 'mainnet' ? '' : `${network.toLowerCase()}.`
  }etherscan.io/address/${address}`
}
