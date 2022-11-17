import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import ProofResult from 'models/ProofResult'
import axios from 'axios'
import makeTransaction from 'helpers/makeTransaction'

export default async function (
  id: string,
  proverAddress: string
): Promise<ECDSAProofStruct> {
  let result: ECDSAProofStruct = {} as ECDSAProofStruct

  while (!Object.keys(result).length) {
    const { data } = await sendRequest(id, proverAddress)
    // TODO: Add error and other states handling
    if (data.job.status === 'completed') {
      result = makeTransaction(data.job.result)
    }

    await sleep(15 * 1000)
  }
  return result
}

function sendRequest(id: string, proverAddress: string) {
  // TODO: Fix types
  return axios.get<{ job: { result: ProofResult; status: string } }>(
    `${proverAddress}/${id}`
  )
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
