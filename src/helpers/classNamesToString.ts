import { TTailwindString } from 'classnames/tailwind'

type AllowedExtraClassnames =
  | 'seal-star'
  | 'small-star'
  | 'colorful-bg'
  | 'mask-border-fade-1'
  | 'mask-border-fade-2'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}