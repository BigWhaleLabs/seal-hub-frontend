import createProof from 'helpers/createProof'
import makeTransaction from 'helpers/makeTransaction'

export default async function (signature: string, baseMessage: string) {
  const proof = await createProof(signature, baseMessage)
  const txData = makeTransaction(proof)

  return txData
}
