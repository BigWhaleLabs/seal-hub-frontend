import { AccentText, BodyText, HeaderText } from 'components/Common/Text'
import PalmStars from 'components/NotFound/PalmStars'
import PalmTree from 'icons/PalmTree'
import classnames, {
  alignItems,
  animation,
  display,
  flexDirection,
  gap,
  margin,
  position,
  space,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6'),
  alignItems('items-center')
)
const palmBlock = classnames(position('relative'), margin('my-16'))

export default function () {
  return (
    <div className={wrapper}>
      <div className={palmBlock}>
        <PalmStars />
        <div className={animation('animate-rotateY')}>
          <PalmTree />
        </div>
      </div>
      <AccentText>// 100% NOT RIGHT</AccentText>
      <div className={space('space-y-2')}>
        <HeaderText centered>This page failed to load</HeaderText>
        <BodyText centered>
          No worries, just refresh or try visiting again.
        </BodyText>
      </div>
    </div>
  )
}
