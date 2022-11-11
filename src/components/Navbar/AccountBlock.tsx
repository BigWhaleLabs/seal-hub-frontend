import { useDisconnect } from 'wagmi'
import AppStore from 'stores/AppStore'
import Dropdown from 'components/Dropdown'
import ENSAddress from 'components/ENSAddress'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

const options = [
  { label: 'Etherscan', value: 'etherscan' },
  { label: 'Disconnect', value: 'disconnect' },
]

export default function ({
  address,
  network,
}: {
  address: string
  network: string
}) {
  const { disconnect } = useDisconnect()

  return (
    <Dropdown
      extraSpacing
      fitToItemSize
      currentValue={window.location.origin}
      options={options}
      staticPlaceholder={<ENSAddress address={address} />}
      onChange={(selectedValue: string) => {
        if (selectedValue === 'disconnect') {
          AppStore.resetOnDisconnect()
          disconnect()
        } else {
          address &&
            network &&
            window.open(getEtherscanAddressUrl(address, network), '_blank')
        }
      }}
    />
  )
}
