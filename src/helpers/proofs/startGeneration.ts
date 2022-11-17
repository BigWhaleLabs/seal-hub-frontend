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
    if (!proverAddress) throw new Error('Prover address is not defined')

    JobStore.proverAddress = proverAddress
    if (!AppStore.message || !AppStore.signature || !JobStore.proverAddress)
      throw new Error('Missing input data and prover address')

    const jobId = await scheduleProofJob(
      { message: AppStore.message, signature: AppStore.signature },
      JobStore.proverAddress
    )
    return getCentralizedProof(jobId, JobStore.proverAddress)
  },
  centralizedReloaded: () => {
    if (!JobStore.proverAddress || !JobStore.jobId)
      throw new Error('Missing job data')

    return getCentralizedProof(JobStore.jobId, JobStore.proverAddress)
  },
  decentralized: () => {
    if (!AppStore.input) throw new Error('Missing input data')

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
    // TODO: Handle error here
  } finally {
    delete AppStore.proof
    delete AppStore.input
  }
}
