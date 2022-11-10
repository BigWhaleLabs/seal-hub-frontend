import { AccentText, BodyText, HeaderText } from 'components/Text'
import PalmTree from 'icons/PalmTree'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  display,
  flexDirection,
  fontSize,
  fontWeight,
  gap,
  inset,
  position,
  rotate,
  space,
  textColor,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6'),
  alignItems('items-center')
)
const big404 = classNamesToString(
  position('absolute'),
  rotate('-rotate-90'),
  fontSize('text-13.5xl'),
  textColor('text-transparent'),
  fontWeight('font-bold'),
  inset('right-full-73', 'top-1/2'),
  'accent-text-stroke'
)

export default function () {
  return (
    <>
      <div className={wrapper}>
        <div>
          <PalmTree />
        </div>
        <AccentText>// 100% NOT RIGHT</AccentText>
        <div className={space('space-y-2')}>
          <HeaderText>This page failed to load</HeaderText>
          <BodyText centered>
            No worries, just refresh or try visiting again.
          </BodyText>
        </div>
      </div>
      <span className={big404}>404</span>
    </>
  )
}
