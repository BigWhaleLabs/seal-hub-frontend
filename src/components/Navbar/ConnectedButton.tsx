import { AccentText } from 'components/UI/Text'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import AccountBlock from 'components/Navbar/AccountBlock'
import AppStore from 'stores/AppStore'

const NotConnected = () => (
  <AccentText color="text-primary-semi-dimmed">
    <span className={displayTo('lg')}>No wallet</span>
    <span className={displayFrom('lg')}>Connect burner wallet</span>
  </AccentText>
)

export default function () {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        if (!mounted) return <NotConnected />

        const connected = mounted && account && chain
        AppStore.connected = !!connected

        return connected && chain.name ? (
          <AccountBlock address={account.address} />
        ) : (
          <div onClick={openConnectModal}>
            <NotConnected />
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
