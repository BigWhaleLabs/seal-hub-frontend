import classnames, {
  dropShadow,
  height,
  rotate,
  transitionDuration,
  width,
} from 'classnames/tailwind'

const arrowAnimation = ({ openDisabled, open }: ArrowProps) =>
  classnames(
    dropShadow('drop-shadow-secondary'),
    rotate({ 'rotate-180': !openDisabled && open }),
    transitionDuration('duration-300')
  )
const svgInnerWrapper = (reversed?: boolean, reversedOnMobiles?: boolean) =>
  classnames(
    width('w-full'),
    height('h-auto'),
    rotate({
      'rotate-180': reversed || reversedOnMobiles,
      'md:rotate-0': reversedOnMobiles,
    })
  )

interface ArrowProps {
  openDisabled?: boolean
  pulseDisabled?: boolean
  horizontal?: boolean
  open?: boolean
  reversed?: boolean
  reversedOnMobiles?: boolean
}

export default function ({
  pulseDisabled,
  horizontal,
  openDisabled,
  open,
  reversed,
  reversedOnMobiles,
}: ArrowProps) {
  // same id of <linearGradient> will break multiple usage of this icon
  const strokeId = Math.random().toString()

  return (
    <div className={svgInnerWrapper(reversed, reversedOnMobiles)}>
      <svg
        viewBox={horizontal ? '0 0 7 14' : '0 0 14 7'}
        xmlns="http://www.w3.org/2000/svg"
        className={arrowAnimation({
          pulseDisabled,
          openDisabled,
          open,
        })}
      >
        <path
          d="M10.75 1.25L6.25 5.75L1.75 1.25"
          stroke={`url(#${strokeId})`}
          stroke-width="2"
          transform={horizontal ? 'rotate(-90 7 7)' : undefined}
        />
        <defs>
          <linearGradient
            id={strokeId}
            x1="4"
            y1="1.4"
            x2="4"
            y2="5.8"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FF7BED" />
            <stop offset="1" stop-color="#FED823" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
