import { AccentText, GradientText } from 'components/Text'
import Button from 'components/Button'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-8')
)
const buttonsWrapper = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-between'),
  alignItems('items-center')
)

export default function () {
  return (
    <div className={container}>
      <div>
        This is a heavy process on your machine. It might help to close other
        programs or browser tabs before beginning. It also may take some time,
        so feel free to come back to this page during generation. Once ZKP is
        created, we’ll add it to the chain immediately.
      </div>
      <div className={buttonsWrapper}>
        <Button onClick={() => console.log('Clicked')}>
          Start ZKP generation
        </Button>
        <AccentText color="text-primary-semi-dimmed">or</AccentText>
        <GradientText>Generate on a centralized prover</GradientText>
      </div>
    </div>
  )
}
