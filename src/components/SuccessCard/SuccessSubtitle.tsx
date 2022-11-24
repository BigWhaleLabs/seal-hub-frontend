import { LinkText } from 'components/Common/Text'
import { useAccount, useDisconnect } from 'wagmi'
import AppStore from 'stores/AppStore'

export default function () {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const resetConnection = () => {
    AppStore.resetOnDisconnect()
    disconnect()
  }

  return (
    <div>
      You can add another wallet’s commitment.
      <br />
      <LinkText onClick={resetConnection}>
        {address
          ? 'Disconnect wallet and add commitment for another wallet'
          : 'Add commitment for another wallet'}
      </LinkText>
    </div>
  )
}
