import { ErrorType, isKnownError } from 'types/ErrorType'
import { Phase } from 'types/flowPhase'
import { STATES } from 'types/SigningStates'
import AppStore from 'stores/AppStore'
import GenerationWay from 'types/GenerationWay'
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
  AppStore.phase = Phase.GENERATE
  AppStore.flowState = STATES.GENERATE_PROOF
  AppStore.preferredProofWay = generationWay
  try {
    const txData = await getProofByWay[generationWay](proverAddress)
    AppStore.proof = txData
    AppStore.flowState = STATES.GENERATE_COMMITMENT
    await generateCommitment(AppStore.proof)
    AppStore.phase = Phase.SUCCESS
    JobStore.cleanData()
  } catch (e) {
    console.error(e)
    AppStore.flowState = STATES.ERROR
    AppStore.error = isKnownError(e) ? e : ErrorType.UNKNOWN
  } finally {
    delete AppStore.proof
    delete AppStore.input
  }
}
