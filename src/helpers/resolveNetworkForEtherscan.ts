import * as Networks from 'wagmi/chains'

export default function (chainId: number) {
  const chain = Object.values(Networks).find((chain) => chain.id === chainId)
  return !chain || !chain.blockExplorers?.etherscan?.url
    ? 'https://etherscan.io'
    : chain.blockExplorers.etherscan.url
}
