import { Phase } from 'models/FlowPhase'
import { errorList } from 'models/ErrorType'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import JobStore from 'stores/JobStore'
import OptionStatus from 'components/StatusesList/OptionStatus'
import SigningStates, { States, generatingFlow } from 'models/SigningStates'
import StatusesList from 'components/StatusesList'

export default function () {
  const { flowState, error } = useSnapshot(AppStore)
  const { jobId } = useSnapshot(JobStore)
  const { subTitle } = SigningStates[flowState]

  const serverCaption = jobId
    ? ' Feel free to leave and come back—we’ll still be here.'
    : ''
  const description = subTitle + serverCaption
  const statusDescription = error ? errorList[error] : description
  const isError = !!error

  const hasCompleteState = (state: States) => {
    switch (state) {
      case States.CHECK_COMMITMENT:
        return !!AppStore.commitment || !!JobStore.jobId
      case States.GENERATE_PROOF:
        return !!AppStore.proof
      case States.GENERATE_COMMITMENT:
        return AppStore.phase === Phase.SUCCESS
      default:
        return false
    }
  }

  return (
    <StatusesList hasError={isError} statusDescription={statusDescription}>
      {generatingFlow.map((state) => (
        <OptionStatus
          isError={isError}
          isCompleted={hasCompleteState(state)}
          isLoading={AppStore.flowState === state}
          state={state}
        />
      ))}
    </StatusesList>
  )
}
