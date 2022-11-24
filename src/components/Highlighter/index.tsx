import { AccentText, HeaderText } from 'components/Common/Text'
import Line from 'components/Highlighter/Line'
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

export default function ({
  text,
  textCenter,
}: {
  text: string
  textCenter?: boolean
}) {
  return (
    <div className={wrapper}>
      <Line toLeft />
      <div className={headerWrapper}>
        <AccentText>
          <HeaderText mono small centered={textCenter}>
            {text}
          </HeaderText>
        </AccentText>
      </div>
      <Line />
    </div>
  )
}
