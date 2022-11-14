import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { ErrorType } from 'types/ErrorType'
import { Phase } from 'types/flowPhase'
import { ProofInput } from 'models/ProofInput'
import { STATES } from 'types/SigningStates'
import { proxy } from 'valtio'
import sealHub from 'helpers/sealHub'

class AppStore {
  connected = false
  phase?: Phase
  flowState = STATES.INIT
  error?: ErrorType

  input?: ProofInput
  proof?: ECDSAProofStruct
  commitment?: bigint
  commitmentTxHash?: string

  resetOnDisconnect() {
    this.connected = false
    this.flowState = STATES.INIT
    this.phase = this.input = this.proof = this.commitment = undefined
  }

  async findCommitmentTx(userAddress?: string) {
    if (!userAddress) return

    await sealHub
      .queryFilter(sealHub.filters.CommitmentCreated())
      .then((events) => {
        for (const event of events)
          if (event.address === userAddress)
            this.commitmentTxHash = event.transactionHash
      })
  }
}

export default proxy(new AppStore())
