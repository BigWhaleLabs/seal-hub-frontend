import { Phase } from 'models/FlowPhase'
import { STATES } from 'models/SigningStates'
import { errorList } from 'models/ErrorType'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import JobStore from 'stores/JobStore'
import Option from 'components/StatusesList/Option'
import SigningStates from 'models/SigningStates'
import StatusesList from 'components/StatusesList'

export default function () {
  const { flowState, error, commitment, proof, phase } = useSnapshot(AppStore)
  const { jobId } = useSnapshot(JobStore)
  const { description } = SigningStates[flowState]

  const statusDescription = error ? errorList[error] : description
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
