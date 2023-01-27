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
    let { ecdsaProof, uPrecomputesProof } = AppStore
    if (!ecdsaProof || !uPrecomputesProof) {
      const result = await getProofByWay[generationWay](proverAddress)
      AppStore.ecdsaProof = ecdsaProof = result.ecdsaProof
      AppStore.uPrecomputesProof = uPrecomputesProof = result.uPrecomputesProof
    }
    AppStore.flowState = States.generateCommitment
    await generateCommitment(ecdsaProof, uPrecomputesProof)
    AppStore.phase = Phase.success
    JobStore.cleanData()
    delete AppStore.ecdsaProof
    delete AppStore.uPrecomputesProof
    delete AppStore.input
  } catch (e) {
    console.error(e)
    AppStore.flowState = States.error
    AppStore.error = isKnownError(e) ? e : ErrorType.unknown
  }
}
