import { States } from 'models/SigningStates'
import AppStore from 'stores/AppStore'
import JobStore from 'stores/JobStore'
import generateCommitment from 'helpers/generateCommitment'
import startGeneration from 'helpers/proofs/startGeneration'

export default async function () {
  if (
    AppStore.flowState === States.generateCommitment &&
    AppStore.ecdsaProof &&
    AppStore.uPrecomputesProof
  ) {
    await generateCommitment(AppStore.ecdsaProof, AppStore.uPrecomputesProof)
    return
  }

  await startGeneration({
    generationWay: AppStore.preferredProofWay,
    proverAddress: JobStore.proverAddress,
  })
}
