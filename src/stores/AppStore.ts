import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { ErrorType } from 'types/ErrorType'
import { Phase } from 'types/flowPhase'
import { ProofInput } from 'models/ProofInput'
import { STATES } from 'types/SigningStates'
import { proxy } from 'valtio'

class AppStore {
  connected = false
  phase?: Phase
  flowState = STATES.INIT
  error?: ErrorType

  input?: ProofInput
  proof?: ECDSAProofStruct
  commitment?: bigint
  commitmentTxHash?: string

  zkDownloadProgress = 1

  resetOnDisconnect() {
    this.connected = false
    this.flowState = STATES.INIT
    this.phase = this.input = this.proof = this.commitment = undefined
  }
}

export default proxy(new AppStore())
