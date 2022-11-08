import { AccentText, HeaderText } from 'components/Text'
import Line from 'components/Line'
import classnames, {
  alignItems,
  display,
  dropShadow,
  gap,
  textTransform,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  gap('gap-x-4'),
  alignItems('items-center')
)
const headerWrapper = classnames(
  textTransform('uppercase'),
  dropShadow('drop-shadow-accent')
)

export default function () {
  return (
    <div className={wrapper}>
      <Line toLeft />
      <div className={headerWrapper}>
        <AccentText>
          <HeaderText mono small>
            Getting started
          </HeaderText>
        </AccentText>
      </div>
      <Line />
    </div>
  )
}
