import { ErrorType, isKnownError } from 'models/ErrorType'
import { Phase } from 'models/FlowPhase'
import { States } from 'models/SigningStates'
import AppStore from 'stores/AppStore'
import GenerationWay from 'models/GenerationWay'
import JobStore from 'stores/JobStore'
import generateCommitment from 'helpers/generateCommitment'
import getProofByWay from 'helpers/proofs/getProofByWay'

export default async function ({
  generationWay,
  proverAddress,
}: {
  generationWay: GenerationWay
  proverAddress?: string
}) {
  AppStore.error = undefined
  AppStore.phase = Phase.generate
  AppStore.flowState = States.generateProof
  AppStore.preferredProofWay = generationWay
  try {
    if (!AppStore.proof) {
      const txData = await getProofByWay[generationWay](proverAddress)
      AppStore.proof = txData
    }
    AppStore.flowState = States.generateCommitment
    await generateCommitment(AppStore.proof)
    AppStore.phase = Phase.success
    JobStore.cleanData()
    delete AppStore.proof
    delete AppStore.input
  } catch (e) {
    console.error(e)
    AppStore.flowState = States.error
    AppStore.error = isKnownError(e) ? e : ErrorType.unknown
  }
}
