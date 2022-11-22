import { Phase } from 'models/FlowPhase'
import { States } from 'models/SigningStates'
import AppStore from 'stores/AppStore'
import JobStore from 'stores/JobStore'

export default function (state: States) {
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
