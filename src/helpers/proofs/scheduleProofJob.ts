import { ProofInput } from 'models/ProofInput'
import JSONbig from 'json-bigint'
import JobStore from 'stores/JobStore'
import api from 'helpers/api'

interface JobResponse {
  id: string
  position: number
}

export default async function (input: ProofInput, proverAddress: string) {
  const formData = new FormData()
  Object.entries(input).forEach(([key, value]) => {
    formData.append(key, JSONbig.stringify(value))
  })

  const { id } = await api
    .post(`${proverAddress}/prove`, { body: formData })
    .json<JobResponse>()
  JobStore.jobId = id

  return id
}
