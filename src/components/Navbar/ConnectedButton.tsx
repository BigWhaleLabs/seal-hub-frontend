import { AccentText } from 'components/Text'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import AccountBlock from 'components/Navbar/AccountBlock'

const NotConnected = () => (
  <>
    <span className={displayTo('lg')}>No wallet</span>
    <span className={displayFrom('lg')}>Connect burner wallet</span>
  </>
)

export default function () {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        if (!mounted)
          return (
            <AccentText color={'text-primary-semi-dimmed'}>
              <NotConnected />
            </AccentText>
          )
        const connected = mounted && account && chain

        return (
          <AccentText
            color={connected ? 'text-accent' : 'text-primary-semi-dimmed'}
          >
            {connected && chain.name ? (
              <AccountBlock address={account.address} network={chain.name} />
            ) : (
              <div onClick={openConnectModal}>
                <NotConnected />
              </div>
            )}
          </AccentText>
        )
      }}
    </ConnectButton.Custom>
  )
}
