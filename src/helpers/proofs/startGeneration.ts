import { ErrorType, isKnownError } from 'types/ErrorType'
import { Phase } from 'types/flowPhase'
import { STATES } from 'types/SigningStates'
import AppStore from 'stores/AppStore'
import JobStore from 'stores/JobStore'
import generateCommitment from 'helpers/generateCommitment'
import generateDecentralizedProof from 'helpers/proofs/generateDecentralizedProof'
import getCentralizedProof from 'helpers/proofs/getCentralizedProof'
import scheduleProofJob from 'helpers/proofs/scheduleProofJob'

export type GenerationWay =
  | 'centralized'
  | 'centralizedReloaded'
  | 'decentralized'

const GetProof = {
  centralized: async (proverAddress?: string) => {
    if (!proverAddress) throw new Error(ErrorType.PROVER)

    const { message, signature } = AppStore
    if (!message || !signature) throw new Error(ErrorType.MISSING_DATA)
    JobStore.proverAddress = proverAddress

    const jobId = await scheduleProofJob({ message, signature }, proverAddress)
    return getCentralizedProof(jobId, proverAddress)
  },
  centralizedReloaded: () => {
    const { proverAddress, jobId } = JobStore
    if (!proverAddress || !jobId) throw new Error(ErrorType.MISSING_DATA)

    return getCentralizedProof(jobId, proverAddress)
  },
  decentralized: () => {
    if (!AppStore.input) throw new Error(ErrorType.MISSING_DATA)

    return generateDecentralizedProof(AppStore.input)
  },
}

export default async function ({
  generationWay,
  proverAddress,
}: {
  generationWay: GenerationWay
  proverAddress?: string
}) {
  AppStore.phase = Phase.GENERATE
  AppStore.flowState = STATES.GENERATE_PROOF
  try {
    const txData = await GetProof[generationWay](proverAddress)
    AppStore.proof = txData
    AppStore.flowState = STATES.GENERATE_COMMITMENT
    const { events } = await generateCommitment(AppStore.proof)
    AppStore.phase = Phase.SUCCESS
    JobStore.cleanData()

    if (!events) return
    AppStore.commitmentTxHash = events[0].transactionHash
  } catch (e) {
    console.error(e)
    AppStore.flowState = STATES.ERROR
    AppStore.error = isKnownError(e) ? e : ErrorType.UNKNOWN
  } finally {
    delete AppStore.proof
    delete AppStore.input
  }
}
