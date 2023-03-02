import { AccentText } from 'components/Common/Text'
import { useDisconnect, useNetwork } from 'wagmi'
import AppStore from 'stores/AppStore'
import Dropdown from 'components/Dropdown'
import ENSAddress from 'components/Navbar/ENSAddress'
import getEtherscanUrl from 'helpers/getEtherscanUrl'

const options = [
  { label: 'Etherscan', value: 'etherscan' },
  { label: 'Disconnect', value: 'disconnect' },
]

function Account({ address }: { address: string }) {
  return (
    <AccentText color="text-accent">
      <ENSAddress address={address} />
    </AccentText>
  )
}

export default function ({ address }: { address: string }) {
  const { chain } = useNetwork()
  const { disconnect } = useDisconnect()

  const onSelectOption = (selectedValue: string) => {
    if (selectedValue === 'disconnect') {
      AppStore.resetOnDisconnect()
      disconnect()
    } else {
      address &&
        chain &&
        window.open(
          getEtherscanUrl({
            chainId: chain.id,
            type: 'address',
            value: address,
          }),
          '_blank'
        )
    }
  }

  return (
    <Dropdown
      extraSpacing
      fitToItemSize
      currentValue={address}
      options={options}
      staticPlaceholder={<Account address={address} />}
      onChange={onSelectOption}
    />
  )
}
