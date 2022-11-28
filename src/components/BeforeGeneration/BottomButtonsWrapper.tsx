import { AccentText } from 'components/Common/Text'
import { JSX } from 'preact/jsx-runtime'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
} from 'classnames/tailwind'

const buttonsWrapper = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  justifyContent('sm:justify-evenly'),
  alignItems('items-center'),
  gap('gap-x-0', 'gap-y-4', 'sm:gap-x-4', 'sm:gap-y-0')
)
const rightBlock = classnames(buttonsWrapper, padding('pb-0', 'sm:pb-5'))

export default function ({
  leftButton,
  rightButton,
}: {
  leftButton: JSX.Element
  rightButton?: JSX.Element
}) {
  return (
    <div className={buttonsWrapper}>
      {leftButton}
      {rightButton && (
        <div className={rightBlock}>
          <AccentText color="text-primary-semi-dimmed">or</AccentText>
          {rightButton}
        </div>
      )}
    </div>
  )
}
