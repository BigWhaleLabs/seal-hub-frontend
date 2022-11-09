import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  borderRadius,
  borderWidth,
  boxShadow,
  display,
  flexDirection,
  padding,
  width,
} from 'classnames/tailwind'

export const basicCardStyles = classnames(
  display('flex'),
  flexDirection('flex-col'),
  backgroundColor('bg-primary-dark'),
  padding('py-8', 'px-6'),
  borderRadius('rounded-2xl'),
  borderWidth('border'),
  boxShadow('shadow-card'),
  width('w-full')
)

export default function ({ children }: ChildrenProp) {
  return <div className={basicCardStyles}>{children}</div>
}
