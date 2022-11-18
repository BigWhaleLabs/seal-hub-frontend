import { Phase } from 'types/flowPhase'
import { STATES } from 'types/SigningStates'
import { errorList } from 'types/ErrorType'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import JobStore from 'stores/JobStore'
import Option from 'components/StatusesList/Option'
import StatusesList from 'components/StatusesList'

export default function () {
  const { flowState, error } = useSnapshot(AppStore)

  const errorDescription = error && errorList[error]

  const statusDescription =
    errorDescription || flowState === STATES.GENERATE_PROOF
      ? 'Hang tight, this whole process may take 5-20 minutes.'
      : flowState === STATES.GENERATE_COMMITMENT
      ? 'Almost there'
      : 'Ready to begin...'
  const isError = !!errorDescription

  return (
    <StatusesList hasError={!!isError} statusDescription={statusDescription}>
      <Option
        complete={!!AppStore.commitment || !!JobStore.jobId}
        error={isError}
        loading={flowState === STATES.CHECK_COMMITMENT}
      >
        Commitment generated
      </Option>
      <Option
        complete={!!AppStore.proof}
        error={isError}
        loading={flowState === STATES.GENERATE_PROOF}
      >
        Generate zero knowledge proof
      </Option>
      <Option
        complete={AppStore.phase === Phase.SUCCESS}
        error={isError}
        loading={flowState === STATES.GENERATE_COMMITMENT}
      >
        Add to chain
      </Option>
    </StatusesList>
  )
}
