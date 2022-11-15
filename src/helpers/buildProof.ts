import { ProofInput } from 'models/ProofInput'
import ProofResult from 'models/ProofResult'
import getECDSACheckerFiles from 'helpers/getECDSACheckerFiles'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default async function build(input: ProofInput): Promise<ProofResult> {
  const files = await getECDSACheckerFiles()
  return snarkjs.groth16.fullProve(input, ...files)
}
