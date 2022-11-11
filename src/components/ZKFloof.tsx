import { STATES } from 'types/SigningStates'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import StatusCardBlock from 'components/StatusCard/StatusCardBlock'
import StatusCardOption from 'components/StatusCard/StatusCardOption'

export default function () {
  const { flowState } = useSnapshot(AppStore)

  const statusDescription =
    flowState === STATES.GENERATE_PROOF
      ? 'Hang tight, this whole process may take 5-20 minutes. Feel free to leave and come back—we’ll still be here.'
      : flowState === STATES.GENERATE_COMMITMENT
      ? 'Almost there'
      : 'Ready to begin...'

  return (
    <StatusCardBlock statusDescription={statusDescription}>
      <StatusCardOption
        complete={!!AppStore.commitment}
        loading={flowState === STATES.CHECK_COMMITMENT}
      >
        Commitment generated
      </StatusCardOption>
      <StatusCardOption
        complete={!!AppStore.proof}
        loading={flowState === STATES.GENERATE_PROOF}
      >
        Generate zero knowledge proof
      </StatusCardOption>
      <StatusCardOption
        complete={AppStore.flowSucceeded}
        loading={flowState === STATES.GENERATE_COMMITMENT}
      >
        Add to chain
      </StatusCardOption>
    </StatusCardBlock>
  )
}
