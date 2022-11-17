import CentralizedBodyRequest from 'types/CentralizedBodyRequest'
import JobStore from 'stores/JobStore'
import axios from 'axios'

export default async function (
  input: CentralizedBodyRequest,
  proverAddress: string
) {
  const { data } = await axios.post<{ job: { _id: string } }>(proverAddress, {
    ...input,
  })
  const jobId = data.job._id
  JobStore.jobId = jobId

  return jobId
}
