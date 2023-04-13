import { AccentText, CookieText } from 'components/Common/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/Common/Button'
import JobStore from 'stores/JobStore'
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
  display,
  flexDirection,
  gap,
  inset,
  margin,
  maxWidth,
  padding,
  position,
  space,
  zIndex,
} from 'classnames/tailwind'

const basicCardStyles = classnames(
  display('flex'),
  flexDirection('flex-col'),
  position('fixed'),
  inset(
    'left-8',
    'right-8',
    'bottom-3',
    'sm:left-auto',
    'sm:bottom-24',
    'md:bottom-10'
  ),
  gap('gap-y-3', 'sm:gap-y-6'),
  backgroundColor('bg-primary-dark'),
  padding('p-6'),
  borderRadius('rounded-2xl'),
  borderWidth('border'),
  borderColor('border-primary'),
  boxShadow('shadow-card'),
  boxShadowColor('shadow-primary-semi-transparent'),
  maxWidth('max-w-full', 'sm:max-w-cookie'),
  zIndex('z-20')
)
const button = (small?: boolean) =>
  classnames(
    margin(small ? 'mx-auto' : 'mr-auto'),
    small ? display('sm:hidden') : display('hidden', 'sm:block')
  )

const CookieButton = ({
  callback,
  small,
}: {
  small?: boolean
  callback: () => void
}) => (
  <Button small={small} onClick={callback}>
    Got it
  </Button>
)

export default function () {
  const { showCookie } = useSnapshot(JobStore)
  const closeCookie = () => (JobStore.showCookie = false)

  if (!showCookie) return null

  return (
    <div className={basicCardStyles}>
      <div className={space('space-y-2')}>
        <AccentText color="text-primary">Yum...cookies! 🍪</AccentText>
        <CookieText>
          We use cookies for crucial functions but we don't track you
        </CookieText>
      </div>
      <div className={button(true)}>
        <CookieButton small callback={closeCookie} />
      </div>
      <div className={button()}>
        <CookieButton callback={closeCookie} />
      </div>
    </div>
  )
}
