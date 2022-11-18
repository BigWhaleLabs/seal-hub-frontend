import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { ErrorType } from 'types/ErrorType'
import JobStatus from 'models/JobStatus'
import ProofResult from 'models/ProofResult'
import axios from 'axios'
import makeTransaction from 'helpers/makeTransaction'

export default async function (
  id: string,
  proverAddress: string
): Promise<ECDSAProofStruct> {
  let result: ECDSAProofStruct = {} as ECDSAProofStruct

  while (!Object.keys(result).length) {
    const {
      data: {
        job: { status, result: jobResult },
      },
    } = await sendRequest(id, proverAddress)
    // TODO: Add error and other states handling
    if (status === JobStatus.completed) result = makeTransaction(jobResult)
    if (status === JobStatus.failed || status === JobStatus.cancelled)
      throw new Error(ErrorType.COMMITMENT)

    await sleep(15 * 1000)
  }
  return result
}

function sendRequest(id: string, proverAddress: string) {
  // TODO: Fix types
  return axios.get<{ job: { result: ProofResult; status: JobStatus } }>(
    `${proverAddress}/${id}`
  )
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
