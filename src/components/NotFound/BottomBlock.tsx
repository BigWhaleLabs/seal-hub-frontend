import { BodyText } from 'components/Common/Text'
import { Link, useLocation } from 'wouter'
import Button from 'components/Common/Button'
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
  const [, setLocation] = useLocation()

  return (
    <div className={wrapper}>
      <Highlighter textCenter text="What to do?" />
      <BodyText centered>Refresh SealHub to start over</BodyText>
      <Link href="/">
        <Button fitContent onClick={() => setLocation('/')}>
          Refresh Sealhub
        </Button>
      </Link>
    </div>
  )
}
