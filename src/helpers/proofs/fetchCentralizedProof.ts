import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { ErrorType } from 'models/ErrorType'
import JobStatus from 'models/JobStatus'
import RequestJobResult from 'models/JobResult'
import axios from 'axios'
import makeTransaction from 'helpers/makeTransaction'

export default async function (
  id: string,
  proverAddress: string
): Promise<ECDSAProofStruct> {
  let result: ECDSAProofStruct = {} as ECDSAProofStruct

  while (!Object.keys(result).length) {
    const { status, result: jobResult } = await sendRequest(id, proverAddress)
    if (status === JobStatus.completed) result = makeTransaction(jobResult)
    if (status === JobStatus.failed || status === JobStatus.cancelled)
      throw new Error(ErrorType.COMMITMENT)

    await sleep(15 * 1000)
  }
  return result
}

async function sendRequest(id: string, proverAddress: string) {
  const { data } = await axios.get<RequestJobResult>(
    `${proverAddress}/prove/${id}`,
    {
      headers: {
        'User-Agent': 'SealHub',
      },
    }
  )
  return data
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
