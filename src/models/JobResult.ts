import JobStatus from 'models/JobStatus'
import ProofResult from 'models/ProofResult'

export default interface RequestJobResult {
  result: {
    ecdsaResult: ProofResult
    uPrecomputesResult: ProofResult
  }
  position: number
  status: JobStatus
}
