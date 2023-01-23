import {
  ECDSAProofStruct,
  UPrecomputesProofStruct,
} from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { Phase } from 'models/FlowPhase'
import AppStore from 'stores/AppStore'
import getSealHubGSN from 'helpers/getSealHubGSN'

export default async function (
  ecdsaProof: ECDSAProofStruct,
  uPrecomputesProof: UPrecomputesProofStruct
) {
  AppStore.error = undefined
  AppStore.phase = Phase.addToChain
  const sealHubGSN = await getSealHubGSN()
  const tx = await sealHubGSN.createCommitment(ecdsaProof, uPrecomputesProof)
  const { events } = await tx.wait()

  if (!events) return
  AppStore.commitmentTxHash = events[0].transactionHash
}
