import { StatusText } from 'components/UI/Text'
import Checkmark from 'icons/Checkmark'
import ChildrenProp from 'models/ChildrenProp'
import Spinner from 'icons/Spinner'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  textColor,
} from 'classnames/tailwind'

const option = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  gap('gap-x-2')
)

export default function ({
  loading,
  complete,
  error,
  children,
}: ChildrenProp & {
  loading?: boolean
  error?: boolean
  complete?: boolean
}) {
  return (
    <StatusText color={complete ? 'success' : undefined}>
      <span className={option}>
        {children}
        {complete && <Checkmark />}
        {loading && <Spinner />}
        {error && !loading && !complete && (
          <span className={textColor('text-error')}>Failed</span>
        )}
      </span>
    </StatusText>
  )
}
