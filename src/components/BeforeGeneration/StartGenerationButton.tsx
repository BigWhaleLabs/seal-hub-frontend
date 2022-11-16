import { Phase } from 'types/flowPhase'
import { STATES } from 'types/SigningStates'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Button from 'components/Button'
import generateCommitment from 'helpers/generateCommitment'
import generateProof from 'helpers/generateProof'

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
          const centralizedInput = useCentralized
            ? { message: 'str', signature: '0x101' } // TODO: should really get message and signature
            : undefined
          const txData = await generateProof(
            AppStore.input,
            centralizedInput,
            proverAddress
          )
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
