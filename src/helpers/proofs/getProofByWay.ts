import { ErrorType } from 'types/ErrorType'
import AppStore from 'stores/AppStore'
import JobStore from 'stores/JobStore'
import fetchCentralizedProof from 'helpers/proofs/fetchCentralizedProof'
import generateDecentralizedProof from 'helpers/proofs/generateDecentralizedProof'
import scheduleProofJob from 'helpers/proofs/scheduleProofJob'

const getProofByWay = {
  centralized: async (proverAddress?: string) => {
    if (!proverAddress) throw new Error(ErrorType.PROVER)

    const { message, signature } = AppStore
    if (!message || !signature) throw new Error(ErrorType.MISSING_DATA)
    JobStore.proverAddress = proverAddress

    const jobId = await scheduleProofJob({ message, signature }, proverAddress)
    return fetchCentralizedProof(jobId, proverAddress)
  },
  centralizedReloaded: () => {
    const { proverAddress, jobId } = JobStore
    if (!proverAddress || !jobId) throw new Error(ErrorType.MISSING_DATA)

    return fetchCentralizedProof(jobId, proverAddress)
  },
  decentralized: () => {
    if (!AppStore.input) throw new Error(ErrorType.MISSING_DATA)

    return generateDecentralizedProof(AppStore.input)
  },
}

export default getProofByWay
