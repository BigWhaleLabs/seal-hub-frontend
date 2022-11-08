import { LogoSubText, LogoText } from 'components/Text'
import { VNode } from 'preact'
import { displayFrom } from 'helpers/visibilityClassnames'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  width,
} from 'classnames/tailwind'

const logoContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  gap('gap-x-2')
)

const logoWithVersion = classnames(
  display('flex'),
  flexDirection('flex-col'),
  displayFrom('md')
)

const logoWrapper = classnames(display('flex'), width('w-full'))

export default function ({
  logo,
  logoText,
  alpha,
}: {
  logo: VNode
  logoText: VNode | string
  alpha?: boolean
}) {
  return (
    <div className={logoContainer}>
      <div className={logoWrapper}>{logo}</div>
      <div className={logoWithVersion}>
        {typeof logoText === 'string' ? (
          <>
            <LogoText>{logoText}</LogoText>
            {alpha && <LogoSubText>(ALPHA)</LogoSubText>}
          </>
        ) : (
          { logoText }
        )}
      </div>
    </div>
  )
}
