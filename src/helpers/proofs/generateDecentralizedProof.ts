import {
  ECDSAProofStruct,
  UPrecomputesProofStruct,
} from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import ProofInput from 'models/ProofInput'
import createProof from 'helpers/proofs/createProof'
import makeTransaction from 'helpers/makeTransaction'

export default async function (input: ProofInput) {
  const [ecdsaProofResult, uPrecomputesProofResult] = await createProof(input)

  return {
    ecdsaResult: makeTransaction<ECDSAProofStruct>(ecdsaProofResult),
    uPrecomputesResult: makeTransaction<UPrecomputesProofStruct>(
      uPrecomputesProofResult
    ),
  }
}
