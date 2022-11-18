import { CaptionText, GradientText } from 'components/Text'
import { HTMLAttributes } from 'preact/compat'
import {
  alignItems,
  backgroundColor,
  backgroundImage,
  borderRadius,
  boxShadow,
  boxShadowColor,
  classnames,
  cursor,
  display,
  flexDirection,
  fontFamily,
  fontSize,
  fontWeight,
  gap,
  gradientColorStops,
  justifyContent,
  lineHeight,
  margin,
  opacity,
  padding,
  position,
  textAlign,
  textColor,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
  width,
} from 'classnames/tailwind'
import Spinner from 'icons/Spinner'

const button = ({
  available,
  fitContent,
  small,
  outlined,
}: {
  available?: boolean
  fitContent?: boolean
  small?: boolean
  outlined?: boolean
}) => {
  const primaryAvailable = available && !outlined

  return classnames(
    display('flex'),
    gap('gap-x-2'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    fontWeight('font-bold'),
    fontFamily('font-primary'),
    transitionProperty('transition-all'),
    transitionTimingFunction('ease-in-out'),
    transitionDuration('duration-100'),
    cursor({ 'cursor-not-allowed': !available }),
    opacity({ 'opacity-50': !available }),
    textAlign('text-center'),
    fontSize('text-lg'),
    lineHeight('leading-6'),
    padding(
      small ? { 'py-2': true, 'px-4': true } : { 'py-4': true, 'px-6': true }
    ),
    textColor('text-primary-dark'),
    borderRadius('rounded-5xl'),
    backgroundColor({ 'bg-primary-background': outlined }),
    backgroundImage(outlined ? 'bg-none' : 'bg-gradient-to-r'),
    gradientColorStops('from-tertiary', 'to-primary-bright'),
    boxShadowColor(
      'shadow-tertiary',
      'hover:shadow-tertiary',
      'active:shadow-tertiary'
    ),
    boxShadow({
      'shadow-2xl': primaryAvailable,
      'hover:shadow-lg': primaryAvailable,
      'active:shadow-button-active': primaryAvailable,
    }),
    width({ 'w-fit': fitContent })
  )
}

const buttonWrapper = (hasCaption?: boolean, outlined?: boolean) =>
  classnames(
    display('flex'),
    flexDirection({ 'flex-col': hasCaption }),
    gap({ 'gap-y-1': hasCaption }),
    alignItems('items-center'),
    padding({ 'p-px': outlined }),
    margin({ 'm-px': outlined }),
    backgroundImage({ 'bg-gradient-to-r': outlined }),
    gradientColorStops('from-secondary', 'to-accent'),
    position({ relative: outlined }),
    borderRadius({ 'rounded-5xl': outlined })
  )

interface ButtonProps {
  disabled?: boolean
  loading?: boolean
  fitContent?: boolean
  caption?: string
  outlined?: boolean
  small?: boolean
}

export default function ({
  loading,
  disabled,
  fitContent,
  caption,
  children,
  outlined,
  small,
  ...rest
}: Omit<HTMLAttributes<HTMLButtonElement>, 'loading'> & ButtonProps) {
  const showContent = !loading
  const available = !loading && !disabled

  const buttonContent = outlined ? (
    <GradientText>{children}</GradientText>
  ) : (
    <span>{children}</span>
  )

  return (
    <div className={buttonWrapper(!!caption, outlined)}>
      <button
        className={button({ available, fitContent, small, outlined })}
        disabled={!available}
        {...rest}
      >
        {loading && <Spinner />}
        {showContent && buttonContent}
      </button>
      <CaptionText>{caption}</CaptionText>
    </div>
  )
}
