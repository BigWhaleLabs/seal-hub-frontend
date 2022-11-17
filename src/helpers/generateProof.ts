import { ProofInput } from 'models/ProofInput'
import createProof from 'helpers/proofs/createProof'
import makeTransaction from 'helpers/makeTransaction'

export default async function (input: ProofInput) {
  const proof = await createProof(input)
  const txData = makeTransaction(proof)

  return txData
}
