import {
  classnames,
  container,
  margin,
  maxWidth,
  padding,
  position,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const root = classnames(
  container('container'),
  position('relative'),
  margin('mx-auto'),
  padding('pb-16', 'py-4'),
  maxWidth('max-w-2xl')
)
export default function ({ children }: ChildrenProp) {
  return <div className={root}>{children}</div>
}
