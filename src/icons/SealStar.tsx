import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  display,
  dropShadow,
  fill,
  justifyContent,
  saturate,
  stroke,
  strokeWidth,
} from 'classnames/tailwind'

const wrapper = (small?: boolean) =>
  classNamesToString(
    display('flex'),
    alignItems('items-center'),
    justifyContent('justify-center'),
    saturate('saturate-200'),
    small ? 'small-star' : 'seal-star',
    'colorful-bg'
  )
const fillAccent = fill('fill-accent')
const commonPath = classnames(
  strokeWidth('stroke-3'),
  stroke('stroke-primary-dark')
)
const accentWithPath = classnames(commonPath, fillAccent)

export default function ({ small }: { small?: boolean }) {
  return (
    <div className={dropShadow('drop-shadow-gold')}>
      <div className={wrapper(small)}>
        <svg viewBox="0 0 50 38" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M33.092 10.0852C33.092 5.85216 36.4258 2.42062 40.5383 2.42062C44.6507 2.42062 47.9845 5.85216 47.9845 10.0852C47.9845 14.3182 44.6507 10.0853 40.5383 10.0853C36.4258 10.0853 33.092 14.3182 33.092 10.0852Z"
            className={accentWithPath}
          />
          <path
            d="M20.3884 21.1853C20.3884 17.9885 22.6442 15.397 25.427 15.397C28.2097 15.397 30.4656 17.9885 30.4656 21.1853C30.4656 24.3822 28.2097 24.0481 25.427 24.0481C22.6442 24.0481 20.3884 24.3822 20.3884 21.1853Z"
            className={fillAccent}
          />
          <path
            d="M25.427 24.0481C28.2097 24.0481 30.4656 24.3822 30.4656 21.1853C30.4656 17.9885 28.2097 15.397 25.427 15.397C22.6442 15.397 20.3884 17.9885 20.3884 21.1853C20.3884 24.3822 22.6442 24.0481 25.427 24.0481ZM25.427 24.0481C25.427 25.9705 25.427 30.248 25.427 31.9782M25.427 31.9782C25.427 37.7456 32.625 37.7455 32.625 31.9782M25.427 31.9782C25.427 37.7455 18.229 37.7455 18.229 31.9783"
            className={commonPath}
          />
          <path
            d="M2.82633 10.0852C2.82633 5.85216 6.16011 2.42062 10.2725 2.42062C14.385 2.42062 17.7188 5.85216 17.7187 10.0852C17.7187 14.3182 14.385 10.0853 10.2725 10.0853C6.16011 10.0853 2.82633 14.3182 2.82633 10.0852Z"
            className={accentWithPath}
          />
          <path d="M48.4618 24.0483L39.8242 25.4902" className={commonPath} />
          <path d="M39.8272 31.4333L48.4648 32.8752" className={commonPath} />
          <path d="M2.38974 24.0474L11.0273 25.4892" className={commonPath} />
          <path d="M11.0321 31.4331L2.39453 32.8749" className={commonPath} />
        </svg>
      </div>
    </div>
  )
}
