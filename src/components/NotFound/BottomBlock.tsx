import { BodyText } from 'components/Text'
import { Link } from 'wouter'
import Button from 'components/Button'
import Highlighter from 'components/Highlighter'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6'),
  alignItems('items-center')
)

export default function () {
  return (
    <div className={wrapper}>
      <Highlighter text="What to do?" textCenter />
      <BodyText centered>Refresh SealHub to start over</BodyText>
      <Link href="/">
        <Button fitContent>Refresh Sealhub</Button>
      </Link>
    </div>
  )
}
