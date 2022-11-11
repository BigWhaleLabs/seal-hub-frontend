export default function (address: string, network: string) {
  return `https://${
    network === 'homestead' ? '' : `${network.toLowerCase()}.`
  }etherscan.io/address/${address}`
}
