import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { ErrorType } from 'types/ErrorType'
import { Phase } from 'types/flowPhase'
import { ProofInput } from 'models/ProofInput'
import { STATES } from 'types/SigningStates'
import { proxy } from 'valtio'
import JobStore from 'stores/JobStore'

class AppStore {
  connected = false
  phase = JobStore.jobId ? Phase.GENERATE : Phase.INIT
  flowState = JobStore.jobId ? STATES.GENERATE_PROOF : STATES.INIT
  error?: ErrorType

  input?: ProofInput
  proof?: ECDSAProofStruct
  commitment?: bigint
  commitmentTxHash?: string

  signature?: string
  message?: string

  resetOnDisconnect() {
    this.connected = false
    this.flowState = STATES.INIT
    this.input = this.proof = this.commitment = undefined
    this.phase = Phase.INIT
  }
}

export default proxy(new AppStore())
