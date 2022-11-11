import { LinkText } from 'components/Text'
import { STAGE } from 'types/flowStage'
import { STATES } from 'types/SigningStates'
import { useDisconnect } from 'wagmi'
import AppStore from 'stores/AppStore'

export default function () {
  const { disconnect } = useDisconnect()
  const resetConnection = () => {
    disconnect()
    AppStore.stage = STAGE.INIT
    AppStore.flowState = STATES.INIT
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
