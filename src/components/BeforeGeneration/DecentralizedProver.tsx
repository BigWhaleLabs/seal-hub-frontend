import {
  AccentText,
  BodyText,
  CaptionText,
  GradientText,
} from 'components/Text'
import { Phase } from 'types/flowPhase'
import { STATES } from 'types/SigningStates'
import { displayTo } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Button from 'components/Button'
import CentralizedProverHint from 'components/CentralizedProverHint'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
} from 'classnames/tailwind'
import generateCommitment from 'helpers/generateCommitment'
import generateProof from 'helpers/generateProof'

const bottomPart = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  gap('gap-y-2')
)
const buttonsWrapper = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  justifyContent('sm:justify-between'),
  alignItems('items-center'),
  gap('gap-x-0', 'gap-y-4', 'sm:gap-x-4', 'sm:gap-y-0')
)
const tooltipWrapper = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  gap('gap-y-2', 'sm:gap-y-0', 'sm:gap-x-2')
)

export default function () {
  const { input } = useSnapshot(AppStore)
  const tooltipText =
    'Using a centralized server won’t be as secure as if you generated yourself locally in browser. Although we’ll do everything we can to protect data, it’ll never be as anonymous. '

  return (
    <>
      <BodyText>
        This is a heavy process on your machine. It might help to close other
        programs or browser tabs before beginning. It also may take some time,
        so feel free to come back to this page during generation. Once ZKP is
        created, we’ll add it to the chain immediately.
      </BodyText>
      <div className={bottomPart}>
        <div className={buttonsWrapper}>
          <Button
            disabled={!input}
            caption="Happens locally in browser"
            onClick={async () => {
              AppStore.phase = Phase.GENERATE
              try {
                if (!AppStore.input) return

                AppStore.flowState = STATES.GENERATE_PROOF
                const txData = await generateProof(AppStore.input)
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

          <div className={displayTo('sm')}>
            <CaptionText>Happens locally in browser</CaptionText>
          </div>

          <AccentText color="text-primary-semi-dimmed">or</AccentText>
          <div className={tooltipWrapper}>
            <GradientText center>Generate on a centralized prover</GradientText>
            <CentralizedProverHint text={tooltipText} />
          </div>
        </div>
      </div>
    </>
  )
}