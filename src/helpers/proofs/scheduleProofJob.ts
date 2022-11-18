import CentralizedBodyRequest from 'types/CentralizedBodyRequest'
import JobStore from 'stores/JobStore'
import axios from 'axios'

interface JobResponse {
  id: string
  position: number
}

export default async function (
  input: CentralizedBodyRequest,
  proverAddress: string
) {
  const { data } = await axios.post<JobResponse>(proverAddress, input)
  JobStore.jobId = data.id

  return data.id
}
