import { LinkText } from 'components/Text'
import { useDisconnect } from 'wagmi'
import AppStore from 'stores/AppStore'

export default function () {
  const { disconnect } = useDisconnect()
  return (
    <div>
      You can add another wallet’s commitment.
      <br />
      <LinkText
        onClick={() => {
          AppStore.flowSucceeded = false
          disconnect()
        }}
      >
        Disconnect wallet and add commitment for another wallet
      </LinkText>
    </div>
  )
}
