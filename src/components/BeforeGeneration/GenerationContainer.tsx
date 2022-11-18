import ChildrenProp from 'models/ChildrenProp'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-8')
)

export default function ({ children }: ChildrenProp) {
  return <div className={container}>{children}</div>
}
