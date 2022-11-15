import { ProofInput } from 'models/ProofInput'
import buildProof from 'helpers/buildProof'
import makeTransaction from 'helpers/makeTransaction'

export default async function (input: ProofInput) {
  const proof = await buildProof(input)
  const txData = makeTransaction(proof)

  return txData
}
