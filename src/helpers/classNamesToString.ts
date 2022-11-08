import { TTailwindString } from 'classnames/tailwind'

type AllowedExtraClassnames = 'seal-star' | 'small-star' | 'colorful-bg'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}
