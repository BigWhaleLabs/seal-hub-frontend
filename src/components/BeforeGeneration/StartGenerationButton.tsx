import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { Phase } from 'types/flowPhase'
import { STATES } from 'types/SigningStates'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Button from 'components/Button'
import generateCommitment from 'helpers/generateCommitment'
import generateProof from 'helpers/generateProof'
import getCentralizedProof from 'helpers/proofs/getCentralizedProof'
import scheduleProofJob from 'helpers/proofs/scheduleProofJob'

export default function ({
  caption,
  useCentralized,
  proverAddress,
  disabled,
}: {
  caption: string
  useCentralized?: boolean
  proverAddress?: string
  disabled?: boolean
}) {
  const { input } = useSnapshot(AppStore)

  return (
    <Button
      disabled={disabled || !input}
      caption={caption}
      onClick={async () => {
        AppStore.phase = Phase.GENERATE
        try {
          if (!AppStore.input) return

          AppStore.flowState = STATES.GENERATE_PROOF

          let txData: ECDSAProofStruct
          if (useCentralized) {
            if (!AppStore.message || !AppStore.signature || !proverAddress)
              throw new Error('Missing data')
            const jobId = await scheduleProofJob(
              { message: AppStore.message, signature: AppStore.signature },
              proverAddress
            )
            txData = await getCentralizedProof(jobId, proverAddress)
          } else {
            txData = await generateProof(AppStore.input)
          }
          AppStore.proof = txData
          AppStore.flowState = STATES.GENERATE_COMMITMENT
          const { events } = await generateCommitment(AppStore.proof)
          AppStore.phase = Phase.SUCCESS

          if (!events) return
          AppStore.commitmentTxHash = events[0].transactionHash
        } finally {
          delete AppStore.proof
          delete AppStore.input
        }
      }}
    >
      Start ZKP generation
    </Button>
  )
}
