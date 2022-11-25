import { errorList } from 'models/ErrorType'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import JobStore from 'stores/JobStore'
import OptionStatus from 'components/StatusesList/OptionStatus'
import SigningStates, { States, generatingFlow } from 'models/SigningStates'
import StatusesList from 'components/StatusesList'
import checkIfStateCompleted from 'helpers/checkIfStateCompleted'

export default function () {
  const { flowState, error } = useSnapshot(AppStore)
  const { jobId, queuePosition } = useSnapshot(JobStore)
  const { subTitle } = SigningStates[flowState]

  const serverCaption =
    jobId && flowState === States.generateProof
      ? 'Feel free to leave and come back—we’ll still be here.'
      : ''
  const queueCaption =
    queuePosition && queuePosition > 0
      ? `Your position in queue is: ${queuePosition}`
      : 'Generating your proof right now'

  const description = subTitle + ' ' + serverCaption + ' ' + queueCaption
  const jobStatus = error ? errorList[error] : description
  const isError = !!error

  return (
    <StatusesList hasError={isError} statusDescription={jobStatus}>
      {generatingFlow.map((state) => (
        <OptionStatus
          isError={isError}
          isCompleted={checkIfStateCompleted(state)}
          isLoading={AppStore.flowState === state}
          state={state}
        />
      ))}
    </StatusesList>
  )
}
