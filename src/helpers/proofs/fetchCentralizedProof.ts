import {
  ECDSAProofStruct,
  UPrecomputesProofStruct,
} from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { ErrorType } from 'models/ErrorType'
import JobStatus from 'models/JobStatus'
import JobStore from 'stores/JobStore'
import RequestJobResult from 'models/JobResult'
import api from 'helpers/api'
import makeTransaction from 'helpers/makeTransaction'

type Result = {
  ecdsaProof: ECDSAProofStruct
  uPrecomputesProof: UPrecomputesProofStruct
}

export default async function (
  id: string,
  proverAddress: string
): Promise<Result> {
  const result = {} as {
    ecdsaProof: ECDSAProofStruct
    uPrecomputesProof: UPrecomputesProofStruct
  }
  while (!Object.keys(result).length) {
    const {
      status,
      position,
      result: jobResult,
    } = await sendRequest(id, proverAddress)
    if (status === JobStatus.completed) {
      result.ecdsaProof = makeTransaction<ECDSAProofStruct>(
        jobResult.ecdsaProof
      )
      result.uPrecomputesProof = makeTransaction<UPrecomputesProofStruct>(
        jobResult.uPrecomputesProof
      )
      JobStore.queuePosition = undefined
    }
    if (status === JobStatus.scheduled || status === JobStatus.running) {
      JobStore.queuePosition = position
    }
    if (status === JobStatus.failed || status === JobStatus.cancelled) {
      JobStore.queuePosition = undefined
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
