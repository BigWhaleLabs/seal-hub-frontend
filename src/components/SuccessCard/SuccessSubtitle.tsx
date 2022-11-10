import { LinkText } from 'components/Text'
import { STATES } from 'types/SigningStates'
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
          AppStore.flowState = STATES.INIT
          disconnect()
        }}
      >
        Disconnect wallet and add commitment for another wallet
      </LinkText>
    </div>
  )
}
