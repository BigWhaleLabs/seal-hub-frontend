import { StatusText } from 'components/Text'
import Checkmark from 'icons/Checkmark'
import ChildrenProp from 'models/ChildrenProp'
import Spinner from 'icons/Spinner'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
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
  children,
}: ChildrenProp & {
  loading?: boolean
  complete?: boolean
}) {
  return (
    <StatusText color={complete ? 'success' : undefined}>
      <span className={option}>
        {children}
        {complete && <Checkmark />}
        {loading && <Spinner />}
      </span>
    </StatusText>
  )
}
