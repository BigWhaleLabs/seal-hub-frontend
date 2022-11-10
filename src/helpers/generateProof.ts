import createProof from 'helpers/createProof'
import makeTransaction from 'helpers/makeTransaction'
import sealHub from 'helpers/sealHub'

export default async function (signature: string, baseMessage: string) {
  const proof = await createProof(signature, baseMessage)
  const txData = makeTransaction(proof)
  const hash = txData.input[0]
  const hasCommitment = await sealHub.commitmentMap(hash)

  return { hasCommitment, txData }
}
