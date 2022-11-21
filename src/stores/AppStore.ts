import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { ErrorType } from 'models/ErrorType'
import { Phase } from 'models/FlowPhase'
import { ProofInput } from 'models/ProofInput'
import { STATES } from 'models/SigningStates'
import { proxy } from 'valtio'
import GenerationWay from 'models/GenerationWay'
import JobStore from 'stores/JobStore'

class AppStore {
  connected = false
  phase?: Phase
  flowState = STATES.INIT
  error?: ErrorType

  input?: ProofInput
  proof?: ECDSAProofStruct
  preferredProofWay: GenerationWay = 'decentralized'
  commitment?: bigint
  commitmentTxHash?: string

  signature?: string
  message?: string

  resetOnDisconnect() {
    this.connected = false
    this.flowState = STATES.INIT
    this.input = this.proof = this.commitment = undefined
    this.phase = Phase.INIT
    JobStore.cleanData()
  }
}

export default proxy(new AppStore())
