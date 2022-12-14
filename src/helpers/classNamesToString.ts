import { TTailwindString } from 'classnames/tailwind'

type AllowedExtraClassnames =
  | 'seal-star'
  | 'small-star'
  | 'colorful-bg'
  | 'hover-tertiary'
  | 'mask-border-fade-1'
  | 'mask-border-fade-2'
  | 'accent-text-stroke'
  | 'empty:border-gray-600'
  | 'hover:pause'
  | 'animate-draw-path'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}
