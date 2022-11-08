import classnames, {
  animation,
  height,
  stroke,
  strokeWidth,
  width,
} from 'classnames/tailwind'

const icon = classnames(width('w-3'), height('h-3'), animation('animate-spin'))
const pathClass = classnames(strokeWidth('stroke-2'), stroke('stroke-current'))

export default function () {
  return (
    <svg
      viewBox="0 0 13 12"
      xmlns="http://www.w3.org/2000/svg"
      className={icon}
    >
      <path
        d="M11.5 6C11.5 8.76142 9.26142 11 6.5 11C3.73858 11 1.5 8.76142 1.5 6C1.5 3.23858 3.73858 1 6.5 1"
        className={pathClass}
      />
    </svg>
  )
}
