import { SealHub } from '@big-whale-labs/seal-hub-contract'

export default async function (contract: SealHub) {
  const commitments = await contract.queryFilter(
    contract.filters.CommitmentCreated()
  )
  return commitments.map((commitment) => commitment.transactionHash)
}
