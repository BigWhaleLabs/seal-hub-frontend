import { ProofInput } from 'models/ProofInput'
import CentralizedBodyRequest from 'types/CentralizedBodyRequest'
import createProof from 'helpers/proofs/createProof'
import getCentralizedProof from 'helpers/proofs/getCentralizedProof'
import makeTransaction from 'helpers/makeTransaction'

export default async function (
  input: ProofInput,
  centralizedInput?: CentralizedBodyRequest,
  proverAddress?: string
) {
  const proof =
    proverAddress && centralizedInput
      ? await getCentralizedProof(centralizedInput, proverAddress)
      : await createProof(input)
  const txData = makeTransaction(proof)

  return txData
}
