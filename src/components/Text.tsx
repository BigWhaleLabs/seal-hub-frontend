import { Link, useRoute } from 'wouter'
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
  transitionProperty,
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
  internal,
  onClick,
  children,
}: ChildrenProp & { url?: string; internal?: boolean; onClick?: () => void }) {
  if (url)
    return internal ? (
      <Link href={url} className={linkText}>
        {children}
      </Link>
    ) : (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={linkText}
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

const footerLink = (active?: boolean) =>
  classnames(
    fontSize('text-sm'),
    fontWeight('font-semibold'),
    textDecoration({ underline: active, 'hover:underline': true }),
    textColor({
      'text-accent': active,
      'hover:text-accent': true,
    }),
    transitionProperty('transition-colors')
  )
export function FooterLink({
  url,
  internal,
  children,
}: ChildrenProp & { url: string; internal?: boolean }) {
  const [isActive] = useRoute(url)

  return internal ? (
    <Link href={url} className={footerLink(isActive)}>
      {children}
    </Link>
  ) : (
    <a
      href={url}
      target={internal ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className={footerLink()}
    >
      {children}
    </a>
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

const cardParagraphText = classnames(
  textColor('text-formal-accent'),
  fontFamily('font-primary'),
  fontSize('text-sm', 'sm:text-base'),
  lineHeight('leading-6')
)
export function CardParagraphText({ children }: ChildrenProp) {
  return <p className={cardParagraphText}>{children}</p>
}

const subheaderCardText = classnames(
  textColor('text-formal-accent'),
  fontFamily('font-primary'),
  fontWeight('font-bold'),
  fontSize('text-lg'),
  lineHeight('leading-7')
)
export function SubheaderCardText({ children }: ChildrenProp) {
  return <p className={subheaderCardText}>{children}</p>
}

const sectionTitle = fontSize('text-sm')
export function SectionTitle({ children }: ChildrenProp) {
  return <p className={sectionTitle}>{children}</p>
}
