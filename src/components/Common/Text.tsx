import { Link } from 'wouter'
import {
  TTextColor,
  animation,
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
import checkIsLinkActive from 'helpers/checkIsLinkActive'
import classNamesToString from 'helpers/classNamesToString'

const headerText = (small?: boolean, mono?: boolean, centered?: boolean) =>
  classnames(
    fontWeight('font-bold'),
    lineHeight(small ? 'leading-8' : 'leading-10'),
    fontSize(small ? 'text-2.5xl' : 'text-3.5xl'),
    fontFamily({ 'font-primary': !mono }),
    textAlign({ 'text-center': centered })
  )
export function HeaderText({
  centered,
  children,
  mono,
  small,
}: ChildrenProp & {
  small?: boolean
  mono?: boolean
  centered?: boolean
}) {
  return <p className={headerText(small, mono, centered)}>{children}</p>
}

const bodyText = (centered?: boolean) =>
  classnames(
    lineHeight('leading-5'),
    fontFamily('font-primary'),
    textAlign({ 'text-center': centered })
  )
export function BodyText({
  centered,
  children,
}: ChildrenProp & { centered?: boolean }) {
  return <p className={bodyText(centered)}>{children}</p>
}

export function AccentText({
  children,
  color,
}: ChildrenProp & { color?: TTextColor }) {
  return <p className={textColor(color ?? 'text-accent')}>{children}</p>
}

const gradientText = (center?: boolean, animatedOnHover?: boolean) =>
  classnames(
    textColor('text-transparent'),
    backgroundImage('bg-gradient-to-r'),
    backgroundClip('bg-clip-text'),
    gradientColorStops('from-secondary', 'to-accent'),
    animation({
      'hover:animate-bg-gradient': animatedOnHover,
    }),
    fontWeight('font-bold'),
    fontFamily('font-primary'),
    width('w-fit'),
    textAlign({ 'text-center': center })
  )
export function GradientText({
  animatedOnHover,
  center,
  children,
}: ChildrenProp & { center?: boolean; animatedOnHover?: boolean }) {
  return (
    <span className={gradientText(center, animatedOnHover)}>{children}</span>
  )
}

const statusText = (color?: 'success' | 'error', center?: boolean) =>
  classnames(
    textColor({
      'text-error': color === 'error',
      'text-formal-accent': !color,
      'text-tertiary': color === 'success',
    }),
    fontSize('text-sm'),
    fontFamily('font-primary'),
    fontWeight('font-bold'),
    textAlign({ 'text-center': center })
  )
export function StatusText({
  center,
  children,
  color,
}: ChildrenProp & { color?: 'success' | 'error'; center?: boolean }) {
  return <span className={statusText(color, center)}>{children}</span>
}

const linkText = classnames(
  textColor('text-primary'),
  textDecoration('underline', 'hover:no-underline'),
  cursor('cursor-pointer')
)
export function LinkText({
  children,
  internal,
  onClick,
  url,
}: ChildrenProp & { url?: string; internal?: boolean; onClick?: () => void }) {
  if (url) {
    return internal ? (
      <Link className={linkText} href={url}>
        {children}
      </Link>
    ) : (
      <a
        className={linkText}
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    )
  }

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
    textDecoration({ 'hover:underline': true, underline: active }),
    textColor({
      'hover:text-accent': true,
      'text-accent': active,
    }),
    transitionProperty('transition-colors')
  )
export function FooterLink({
  children,
  internal,
  url,
}: ChildrenProp & { url: string; internal?: boolean }) {
  const isActive = checkIsLinkActive(url)

  return internal ? (
    <Link className={footerLink(isActive)} href={url}>
      {children}
    </Link>
  ) : (
    <a
      className={footerLink()}
      href={url}
      rel="noopener noreferrer"
      target={internal ? '_self' : '_blank'}
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
export function SocialLink({ children, url }: ChildrenProp & { url: string }) {
  return (
    <a
      className={classNamesToString(socialLink, 'hover-tertiary')}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
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

const captionText = classnames(
  fontFamily('font-primary'),
  textColor('text-primary-brighter'),
  fontSize('text-xs'),
  width('w-fit')
)
export function CaptionText({ children }: ChildrenProp) {
  return <span className={captionText}>{children}</span>
}

export const highlightedText = (bold?: boolean, center?: boolean) =>
  classnames(
    width('w-fit'),
    textColor('text-primary-dark'),
    fontWeight(bold ? 'font-bold' : 'font-semibold'),
    fontFamily(bold ? 'font-primary' : undefined),
    fontSize(bold ? 'text-base' : 'text-sm'),
    lineHeight(bold ? 'leading-6' : 'leading-5'),
    textAlign(center ? 'text-center' : 'text-left')
  )
export function HighlightedText({
  bold,
  center,
  children,
}: ChildrenProp & {
  bold?: boolean
  center?: boolean
}) {
  return <div className={highlightedText(bold, center)}>{children}</div>
}

const cookieText = classnames(
  textColor('text-formal-accent'),
  fontFamily('font-primary'),
  fontSize('text-base', 'sm:text-lg'),
  fontWeight('font-bold'),
  lineHeight('leading-6')
)
export function CookieText({ children }: ChildrenProp) {
  return <p className={cookieText}>{children}</p>
}
