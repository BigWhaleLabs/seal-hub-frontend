import { AccentText, BodyText, HeaderText } from 'components/Text'
import PalmStars from 'components/NotFound/PalmStars'
import PalmTree from 'icons/PalmTree'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  animation,
  display,
  flexDirection,
  fontSize,
  fontWeight,
  gap,
  inset,
  margin,
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
const palmBlock = classnames(position('relative'), margin('my-16'))
const big404 = classNamesToString(
  position('absolute'),
  rotate('-rotate-90'),
  fontSize('text-13.5xl'),
  textColor('text-transparent'),
  fontWeight('font-bold'),
  inset('right-full-73', 'top-1/2'),
  display('hidden', 'lg:block'),
  'accent-text-stroke'
)

export default function () {
  return (
    <>
      <div className={wrapper}>
        <div className={palmBlock}>
          <PalmStars />
          <div className={animation('animate-rotateY')}>
            <PalmTree />
          </div>
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
