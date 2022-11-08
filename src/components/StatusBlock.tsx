import { AccentText, BodyText, StatusText } from 'components/Text'
import { JSX } from 'preact/jsx-runtime'
import Checkmark from 'icons/Checkmark'
import Spinner from 'icons/Spinner'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
  width,
} from 'classnames/tailwind'

const statusLoading = classnames(
  display('flex'),
  backgroundColor('bg-primary-background'),
  flexDirection('flex-col'),
  padding('p-6'),
  alignItems('items-center'),
  justifyContent('justify-between'),
  borderRadius('rounded-lg'),
  gap('gap-y-4'),
  width('w-full')
)
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
    <div className={statusLoading}>
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
    </div>
  )
}
