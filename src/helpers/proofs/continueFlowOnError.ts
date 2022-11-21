import { STATES } from 'models/SigningStates'
import AppStore from 'stores/AppStore'
import JobStore from 'stores/JobStore'
import generateCommitment from 'helpers/generateCommitment'
import startGeneration from 'helpers/proofs/startGeneration'

export default async function () {
  if (AppStore.flowState === STATES.GENERATE_COMMITMENT && AppStore.proof) {
    await generateCommitment(AppStore.proof)
    return
  }

  await startGeneration({
    generationWay: AppStore.preferredProofWay,
    proverAddress: JobStore.proverAddress,
  })
}
