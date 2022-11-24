import { ErrorType } from 'models/ErrorType'
import AppStore from 'stores/AppStore'
import JobStore from 'stores/JobStore'
import fetchCentralizedProof from 'helpers/proofs/fetchCentralizedProof'
import generateDecentralizedProof from 'helpers/proofs/generateDecentralizedProof'
import scheduleProofJob from 'helpers/proofs/scheduleProofJob'

const getProofByWay = {
  centralized: async (proverAddress?: string) => {
    if (!proverAddress) throw new Error(ErrorType.prover)
    if (!proverAddress.startsWith('https://')) {
      proverAddress = `https://${proverAddress}`
    }
    const { input } = AppStore
    if (!input) throw new Error(ErrorType.missingData)
    JobStore.proverAddress = proverAddress

    const jobId = await scheduleProofJob(input, proverAddress)
    return fetchCentralizedProof(jobId, proverAddress)
  },
  centralizedReloaded: () => {
    const { proverAddress, jobId } = JobStore
    if (!proverAddress || !jobId) throw new Error(ErrorType.missingData)

    return fetchCentralizedProof(jobId, proverAddress)
  },
  decentralized: () => {
    if (!AppStore.input) throw new Error(ErrorType.missingData)

    return generateDecentralizedProof(AppStore.input)
  },
}

export default getProofByWay
