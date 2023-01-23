import { Phase } from 'models/FlowPhase'
import { States } from 'models/SigningStates'
import AppStore from 'stores/AppStore'
import JobStore from 'stores/JobStore'

export default function (state: States) {
  switch (state) {
    case States.checkCommitment:
      return !!AppStore.commitment || !!JobStore.jobId
    case States.generateProof:
      return !!AppStore.ecdsaProof && !!AppStore.uPrecomputesProof
    case States.generateCommitment:
      return AppStore.phase === Phase.success
    default:
      return false
  }
}
