import JobStatus from 'models/JobStatus'
import ProofResult from 'models/ProofResult'

export default interface RequestJobResult {
  result: {
    ecdsaProof: ProofResult
    uPrecomputesProof: ProofResult
  }
  position: number
  status: JobStatus
}
