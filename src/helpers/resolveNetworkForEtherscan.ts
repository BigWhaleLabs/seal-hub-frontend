export default function (network: string) {
  return network === 'homestead' ? '' : `${network.toLowerCase()}.`
}
