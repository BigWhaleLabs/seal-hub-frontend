import { ProofInput } from 'models/ProofInput'
import JSONbig from 'json-bigint'
import JobStore from 'stores/JobStore'
import axios from 'axios'

interface JobResponse {
  id: string
  position: number
}

export default async function (input: ProofInput, proverAddress: string) {
  const formData = new FormData()
  Object.entries(input).forEach(([key, value]) => {
    formData.append(key, JSONbig.stringify(value))
  })

  const { data } = await axios.post<JobResponse>(proverAddress, formData)
  JobStore.jobId = data.id

  return data.id
}
