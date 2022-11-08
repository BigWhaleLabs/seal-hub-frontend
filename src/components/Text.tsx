import {
  TTextColor,
  backgroundClip,
  backgroundImage,
  classnames,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  lineHeight,
  textColor,
  textDecoration,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'
import classNamesToString from 'helpers/classNamesToString'

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

export function AccentText({
  color,
  children,
}: ChildrenProp & { color?: TTextColor }) {
  return <p className={textColor(color ?? 'text-accent')}>{children}</p>
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

const logoText = classnames(
  textColor('text-accent'),
  fontWeight('font-bold'),
  fontSize('text-sm', 'xs:text-lg'),
  lineHeight('leading-none')
)
export function LogoText({ children }: ChildrenProp) {
  return <span className={logoText}>{children}</span>
}
const logoSubText = classnames(
  textColor('text-primary-semi-dimmed', 'selection:text-primary'),
  fontWeight('font-bold'),
  fontSize('text-xs')
)
export function LogoSubText({ children }: ChildrenProp) {
  return <span className={logoSubText}>{children}</span>
}

const socialLink = classnames(
  lineHeight('leading-6'),
  fontSize('text-base'),
  textDecoration('no-underline', 'active:underline'),
  textColor('hover:text-tertiary', 'text-formal-accent')
)
export function SocialLink({ url, children }: ChildrenProp & { url: string }) {
  return (
    <a
      className={classNamesToString(socialLink, 'hover-tertiary')}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
