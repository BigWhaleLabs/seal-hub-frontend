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

const headerText = (small?: boolean) =>
  classnames(
    textColor('text-formal-accent'),
    fontWeight('font-bold'),
    lineHeight(small ? 'leading-8' : 'leading-10'),
    fontSize(small ? 'text-2xl' : 'text-3.5xl'),
    fontFamily('font-primary')
  )
export function HeaderText({
  children,
  small,
}: ChildrenProp & {
  small: boolean
}) {
  return <p className={headerText(small)}>{children}</p>
}

const bodyText = classnames(
  textColor('text-formal-accent'),
  lineHeight('leading-5'),
  fontFamily('font-primary')
)
export function BodyText({ children }: ChildrenProp) {
  return <p className={bodyText}>{children}</p>
}
