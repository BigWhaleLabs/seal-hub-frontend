import { CaptionText } from 'components/Text'
import { HTMLAttributes } from 'preact/compat'
import {
  alignItems,
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
  opacity,
  padding,
  textAlign,
  textColor,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
  width,
} from 'classnames/tailwind'
import Spinner from 'icons/Spinner'

const button = (available?: boolean, fitContent?: boolean) =>
  classnames(
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
    padding('py-4', 'px-6'),
    textColor('text-primary-dark'),
    borderRadius('rounded-5xl'),
    backgroundImage('bg-gradient-to-r'),
    gradientColorStops('from-tertiary', 'to-primary-bright'),
    boxShadowColor(
      'shadow-tertiary',
      'hover:shadow-tertiary',
      'active:shadow-tertiary'
    ),
    boxShadow({
      'shadow-2xl': available,
      'hover:shadow-lg': available,
      'active:shadow-button-active': available,
    }),
    width({ 'w-fit': fitContent })
  )

const captionWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-1'),
  alignItems('items-center')
)

interface ButtonProps {
  disabled?: boolean
  loading?: boolean
  fitContent?: boolean
  caption?: string
}

export default function ({
  loading,
  disabled,
  fitContent,
  caption,
  children,
  ...rest
}: Omit<HTMLAttributes<HTMLButtonElement>, 'loading'> & ButtonProps) {
  const showContent = !loading
  const available = !loading && !disabled

  return (
    <div className={caption ? captionWrapper : undefined}>
      <button
        className={button(available, fitContent)}
        disabled={!available}
        {...rest}
      >
        {loading && <Spinner />}
        {showContent && <span>{children}</span>}
      </button>
      <CaptionText>{caption}</CaptionText>
    </div>
  )
}
