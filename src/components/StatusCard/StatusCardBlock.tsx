import { StatusText } from 'components/Text'
import ChildrenProp from 'models/ChildrenProp'
import Delimiter from 'components/Delimiter'
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

const statusCard = classnames(
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

export default function ({
  statusDescription,
  children,
}: ChildrenProp & {
  statusDescription: string
}) {
  return (
    <div className={statusCard}>
      {children}
      <Delimiter horizontal />
      <StatusText>{statusDescription}</StatusText>
    </div>
  )
}
