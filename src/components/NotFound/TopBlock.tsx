import { AccentText, HeaderText, SubheaderCardText } from 'components/Text'
import PalmTree from 'icons/PalmTree'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6'),
  alignItems('items-center')
)

export default function () {
  return (
    <div className={wrapper}>
      <div>
        <PalmTree />
      </div>
      <AccentText>// 100% NOT RIGHT</AccentText>
      <div>
        <HeaderText>This page failed to load</HeaderText>
        <SubheaderCardText>
          No worries, just refresh or try visiting again.{' '}
        </SubheaderCardText>
      </div>
    </div>
  )
}
