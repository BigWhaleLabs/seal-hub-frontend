import { LinkText } from 'components/Text'
import { Phase } from 'types/flowPhase'
import { STATES } from 'types/SigningStates'
import { useDisconnect } from 'wagmi'
import AppStore from 'stores/AppStore'

export default function () {
  const { disconnect } = useDisconnect()
  const resetConnection = () => {
    AppStore.phase = Phase.INIT
    AppStore.flowState = STATES.INIT
    disconnect()
  }

  return (
    <div>
      You can add another wallet’s commitment.
      <br />
      <LinkText onClick={resetConnection}>
        Disconnect wallet and add commitment for another wallet
      </LinkText>
    </div>
  )
}
