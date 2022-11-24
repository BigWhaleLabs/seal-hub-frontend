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

const block = (transparent?: boolean) =>
  classnames(
    display('flex'),
    backgroundColor({ 'bg-primary-background': !transparent }),
    flexDirection('flex-col'),
    padding('p-6'),
    alignItems('items-center'),
    justifyContent('justify-between'),
    borderRadius('rounded-lg'),
    gap('gap-y-4'),
    width('w-full')
  )

export default function ({
  transparent,
  children,
}: ChildrenProp & { transparent?: boolean }) {
  return <div className={block(transparent)}>{children}</div>
}
