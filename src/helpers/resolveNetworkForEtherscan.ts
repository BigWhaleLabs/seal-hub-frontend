import * as Networks from 'wagmi/chains'

export default function (chainId: number) {
  const chain = Object.values(Networks).find((chain) => chain.id === chainId)
  return chain &&
    'blockExplorers' in chain &&
    chain.blockExplorers &&
    'etherscan' in chain.blockExplorers &&
    chain.blockExplorers?.etherscan?.url
    ? chain.blockExplorers.etherscan.url
    : 'https://etherscan.io'
}
