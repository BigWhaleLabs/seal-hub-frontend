import ChildrenProp from 'models/ChildrenProp'
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

const block = classnames(
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

export default function ({ children }: ChildrenProp) {
  return <div className={block}>{children}</div>
}
