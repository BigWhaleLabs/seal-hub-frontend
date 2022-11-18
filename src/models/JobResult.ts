import JobStatus from 'models/JobStatus'
import ProofResult from 'models/ProofResult'

export default interface RequestJobResult {
  result: ProofResult
  status: JobStatus
}
