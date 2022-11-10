import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { ProofInput } from 'models/ProofInput'
import { STATES } from 'types/SigningStates'
import { proxy } from 'valtio'

class AppStore {
  connected = false
  flowSucceeded = false
  flowState = STATES.INIT

  input?: ProofInput
  proof?: ECDSAProofStruct
  commitment?: bigint
}

export default proxy(new AppStore())
