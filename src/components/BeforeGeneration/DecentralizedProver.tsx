import { AccentText, BodyText, GradientText } from 'components/Text'
import { Phase } from 'types/flowPhase'
import AppStore from 'stores/AppStore'
import CentralizedProverHint from 'components/CentralizedProverHint'
import GenerationContainer from 'components/BeforeGeneration/GenerationContainer'
import StartGenerationButton from 'components/BeforeGeneration/StartGenerationButton'
import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  gap,
  justifyContent,
} from 'classnames/tailwind'

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
  gap('gap-y-2', 'sm:gap-y-0', 'sm:gap-x-2'),
  cursor('cursor-pointer')
)

export default function () {
  const tooltipText =
    'Using a centralized server won’t be as secure as if you generated yourself locally in browser. Although we’ll do everything we can to protect data, it’ll never be as anonymous. '

  return (
    <GenerationContainer>
      <BodyText>
        This is a heavy process on your machine. It might help to close other
        programs or browser tabs before beginning. It also may take some time,
        so feel free to come back to this page during generation. Once ZKP is
        created, we’ll add it to the chain immediately.
      </BodyText>
      <div className={bottomPart}>
        <div className={buttonsWrapper}>
          <StartGenerationButton caption="Happens locally in browser" />

          <AccentText color="text-primary-semi-dimmed">or</AccentText>
          <div
            className={tooltipWrapper}
            onClick={() => (AppStore.phase = Phase.READY_CENTRALIZED)}
          >
            <GradientText center>Generate on a centralized prover</GradientText>
            <CentralizedProverHint text={tooltipText} />
          </div>
        </div>
      </div>
    </GenerationContainer>
  )
}
