import { AccentText, BodyText, StatusText } from 'components/Text'
import { JSX } from 'preact/jsx-runtime'
import Checkmark from 'icons/Checkmark'
import Spinner from 'icons/Spinner'
import StatusCard from 'components/StatusCard'
import classnames, { alignItems, display, gap } from 'classnames/tailwind'

const loadingBlock = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-2')
)

export default function ({
  loadingText = 'Loading',
  subtitle = 'Hang tight! We’re fetching the content.',
  completed,
  errorBlock,
}: {
  loadingText?: string
  subtitle?: string | JSX.Element
  errorBlock?: JSX.Element
  completed?: boolean
}) {
  return (
    <StatusCard>
      {errorBlock}
      {!!loadingText.length && (
        <AccentText>
          <StatusText color="success">
            <span className={loadingBlock}>
              {loadingText} {completed ? <Checkmark /> : <Spinner />}
            </span>
          </StatusText>{' '}
        </AccentText>
      )}
      {typeof subtitle === 'string' ? (
        <BodyText>{subtitle}</BodyText>
      ) : (
        subtitle
      )}
    </StatusCard>
  )
}
