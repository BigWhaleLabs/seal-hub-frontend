import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { Phase } from 'models/FlowPhase'
import AppStore from 'stores/AppStore'
import getSealHubGSN from 'helpers/getSealHubGSN'

export default async function (txData: ECDSAProofStruct) {
  AppStore.error = undefined
  AppStore.phase = Phase.ADD_TO_CHAIN
  const sealHubGSN = await getSealHubGSN()
  const tx = await sealHubGSN.createCommitment(txData)
  const { events } = await tx.wait()

  if (!events) return
  AppStore.commitmentTxHash = events[0].transactionHash
}
