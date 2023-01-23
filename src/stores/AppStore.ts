import {
  ECDSAProofStruct,
  UPrecomputesProofStruct,
} from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { ErrorType } from 'models/ErrorType'
import { Phase } from 'models/FlowPhase'
import { States } from 'models/SigningStates'
import { proxy } from 'valtio'
import GenerationWay from 'models/GenerationWay'
import JobStore from 'stores/JobStore'
import ProofInput from 'models/ProofInput'

class AppStore {
  connected = false
  phase?: Phase
  flowState = States.init
  error?: ErrorType

  input?: ProofInput
  ecdsaProof?: ECDSAProofStruct
  uPrecomputesProof?: UPrecomputesProofStruct
  preferredProofWay: GenerationWay = 'decentralized'
  commitment?: bigint
  commitmentTxHash?: string

  signature?: string
  message?: string

  resetOnDisconnect() {
    this.connected = false
    this.flowState = States.init
    this.input =
      this.ecdsaProof =
      this.uPrecomputesProof =
      this.commitment =
        undefined
    this.phase = Phase.init
    JobStore.cleanData()
  }
}

export default proxy(new AppStore())
