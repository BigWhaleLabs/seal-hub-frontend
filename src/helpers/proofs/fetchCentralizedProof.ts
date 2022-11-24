import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { ErrorType } from 'models/ErrorType'
import JobStatus from 'models/JobStatus'
import RequestJobResult from 'models/JobResult'
import api from 'helpers/api'
import makeTransaction from 'helpers/makeTransaction'

export default async function (
  id: string,
  proverAddress: string
): Promise<ECDSAProofStruct> {
  let result: ECDSAProofStruct = {} as ECDSAProofStruct

  while (!Object.keys(result).length) {
    const { status, result: jobResult } = await sendRequest(id, proverAddress)
    if (status === JobStatus.completed) result = makeTransaction(jobResult)
    if (status === JobStatus.failed || status === JobStatus.cancelled) {
      throw new Error(ErrorType.commitment)
    }

    await sleep(15 * 1000)
  }
  return result
}

function sendRequest(id: string, proverAddress: string) {
  return api.get(`${proverAddress}/prove/${id}`).json<RequestJobResult>()
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
