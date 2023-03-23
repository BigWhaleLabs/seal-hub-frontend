import { HTMLAttributes } from 'preact/compat'
import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  opacity,
  outlineStyle,
  padding,
  textColor,
  transitionProperty,
} from 'classnames/tailwind'

const inputContainer = () =>
  classnames(
    backgroundColor('bg-transparent'),
    borderRadius('rounded-md'),
    borderWidth('border'),
    borderColor(
      'border-gray-200',
      'placeholder-shown:!border-gray-300', // empty is valid too, we should override it
      'invalid:border-error',
      'valid:border-tertiary'
    ),
    outlineStyle('outline-none', 'focus-visible:outline-none'),
    opacity('disabled:opacity-50'),
    textColor(
      'text-formal-accent',
      'placeholder:text-gray-600',
      'invalid:text-error',
      'valid:text-tertiary',
      'focus:text-formal-accent'
    ),
    transitionProperty('transition-colors'),
    padding('px-4', 'py-3')
  )

export default function ({
  disabled,
  value,
  ...rest
}: {
  value?: string
  isError?: boolean
  disabled?: boolean
} & HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={inputContainer()}
      disabled={disabled}
      value={value}
      {...rest}
    />
  )
}
