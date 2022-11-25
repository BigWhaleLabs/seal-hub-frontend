import { AccentText, StatusText } from 'components/Common/Text'
import Checkmark from 'icons/Checkmark'
import Spinner from 'icons/Spinner'
import classnames, { alignItems, display, gap } from 'classnames/tailwind'

const loadingBlock = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-2')
)

export default function ({
  loadingText,
  completed,
}: {
  loadingText?: string
  completed?: boolean
}) {
  if (!loadingText) return null

  return (
    <AccentText>
      <StatusText color="success">
        <span className={loadingBlock}>
          {loadingText} {completed ? <Checkmark /> : <Spinner />}
        </span>
      </StatusText>{' '}
    </AccentText>
  )
}
