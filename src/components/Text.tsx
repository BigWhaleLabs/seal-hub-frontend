import {
  backgroundClip,
  backgroundImage,
  classnames,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  lineHeight,
  textColor,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const headerText = (small?: boolean) =>
  classnames(
    fontWeight('font-bold'),
    lineHeight(small ? 'leading-8' : 'leading-10'),
    fontSize(small ? 'text-2xl' : 'text-3.5xl'),
    fontFamily('font-primary')
  )
export function HeaderText({
  children,
  small,
}: ChildrenProp & {
  small?: boolean
}) {
  return <p className={headerText(small)}>{children}</p>
}

const bodyText = classnames(lineHeight('leading-5'), fontFamily('font-primary'))
export function BodyText({ children }: ChildrenProp) {
  return <p className={bodyText}>{children}</p>
}

export function AccentText({ children }: ChildrenProp) {
  return <p className={textColor('text-accent')}>{children}</p>
}

const gradientText = classnames(
  textColor('text-transparent'),
  backgroundImage('bg-gradient-to-r'),
  backgroundClip('bg-clip-text'),
  gradientColorStops('from-secondary', 'to-accent'),
  fontWeight('font-bold'),
  fontFamily('font-primary')
)
export function GradientText({ children }: ChildrenProp) {
  return <span className={gradientText}>{children}</span>
}

const statusText = (color: 'success' | 'error') =>
  classnames(
    textColor({
      'text-tertiary': color === 'success',
      'text-error': color === 'error',
    }),
    fontSize('text-sm'),
    fontFamily('font-primary'),
    fontWeight('font-bold')
  )
export function StatusText({
  children,
  color,
}: ChildrenProp & { color: 'success' | 'error' }) {
  return <span className={statusText(color)}>{children}</span>
}
