import {
  TTextColor,
  backgroundClip,
  backgroundImage,
  classnames,
  cursor,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  lineHeight,
  textAlign,
  textColor,
  textDecoration,
  width,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'
import classNamesToString from 'helpers/classNamesToString'

const headerText = (small?: boolean, mono?: boolean) =>
  classnames(
    fontWeight('font-bold'),
    lineHeight(small ? 'leading-8' : 'leading-10'),
    fontSize(small ? 'text-2.5xl' : 'text-3.5xl'),
    fontFamily({ 'font-primary': !mono })
  )
export function HeaderText({
  children,
  small,
  mono,
}: ChildrenProp & {
  small?: boolean
  mono?: boolean
}) {
  return <p className={headerText(small, mono)}>{children}</p>
}

const bodyText = (centered?: boolean) =>
  classnames(
    lineHeight('leading-5'),
    fontFamily('font-primary'),
    textAlign({ 'text-center': centered })
  )
export function BodyText({
  children,
  centered,
}: ChildrenProp & { centered?: boolean }) {
  return <p className={bodyText(centered)}>{children}</p>
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
  fontFamily('font-primary'),
  width('w-fit')
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

const linkText = classnames(
  textColor('text-primary'),
  textDecoration('underline', 'hover:no-underline'),
  cursor('cursor-pointer')
)
export function LinkText({
  url,
  onClick,
  children,
}: ChildrenProp & { url?: string; onClick?: () => void }) {
  if (url)
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={linkText}
        onClick={onClick}
      >
        {children}
      </a>
    )
  return (
    <span className={linkText} onClick={() => onClick && onClick()}>
      {children}
    </span>
  )
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
