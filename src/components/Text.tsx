import {
  classnames,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textAlign,
  textColor,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const headerText = classnames(
  textColor('text-formal-accent'),
  fontWeight('font-bold'),
  lineHeight('leading-10'),
  fontSize('text-3.5xl'),
  fontFamily('font-primary')
)
export function HeaderText({ children }: ChildrenProp) {
  return <p className={headerText}>{children}</p>
}

const bodyText = classnames(
  textColor('text-formal-accent'),
  lineHeight('leading-5'),
  fontFamily('font-primary')
)
export function BodyText({ children }: ChildrenProp) {
  return <p className={bodyText}>{children}</p>
}
