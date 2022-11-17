import { AccentText } from 'components/Text'
import { JSX } from 'preact/jsx-runtime'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
} from 'classnames/tailwind'

const buttonsWrapper = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  justifyContent('sm:justify-evenly'),
  alignItems('items-center'),
  gap('gap-x-0', 'gap-y-4', 'sm:gap-x-4', 'sm:gap-y-0')
)

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
      {rightButton ? (
        <>
          <AccentText color="text-primary-semi-dimmed">or</AccentText>
          {rightButton}
        </>
      ) : undefined}
    </div>
  )
}
