import {
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

export function AccentText({ children }: ChildrenProp) {
  return <p className={textColor('text-accent')}>{children}</p>
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
