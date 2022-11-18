import { Phase } from 'types/flowPhase'
import { STATES } from 'types/SigningStates'
import { errorList } from 'types/ErrorType'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import JobStore from 'stores/JobStore'
import Option from 'components/StatusesList/Option'
import StatusesList from 'components/StatusesList'

export default function () {
  const { flowState, error, commitment, proof, phase } = useSnapshot(AppStore)
  const { jobId } = useSnapshot(JobStore)

  const statusDescription = error
    ? errorList[error]
    : flowState === STATES.GENERATE_PROOF
    ? 'Hang tight, this whole process may take 5-20 minutes.'
    : flowState === STATES.GENERATE_COMMITMENT
    ? 'Almost there'
    : 'Ready to begin...'
  const isError = !!error

  return (
    <StatusesList hasError={isError} statusDescription={statusDescription}>
      <Option
        complete={!!commitment || !!jobId}
        error={isError}
        loading={flowState === STATES.CHECK_COMMITMENT}
      >
        Commitment generated
      </Option>
      <Option
        complete={!!proof}
        error={isError}
        loading={flowState === STATES.GENERATE_PROOF}
      >
        Generate zero knowledge proof
      </Option>
      <Option
        complete={phase === Phase.SUCCESS}
        error={isError}
        loading={flowState === STATES.GENERATE_COMMITMENT}
      >
        Add to chain
      </Option>
    </StatusesList>
  )
}
