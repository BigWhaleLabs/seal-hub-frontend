import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import getSealHubGSN from 'helpers/getSealHubGSN'

export default async function (txData: ECDSAProofStruct) {
  const sealHubGSN = await getSealHubGSN()
  const tx = await sealHubGSN.createCommitment(txData)
  await tx.wait()
}
