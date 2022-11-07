import { AccentText } from 'components/Text'
import { JSX } from 'preact/jsx-runtime'
import classnames, {
  display,
  flexDirection,
  gap,
  textTransform,
} from 'classnames/tailwind'

interface TopCardProps {
  label: string
  title: string
  subtitle: string | JSX.Element
  statusOrContent: string | JSX.Element
}

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6')
)

export default function ({
  label,
  title,
  subtitle,
  statusOrContent,
}: TopCardProps) {
  return (
    <div className={wrapper}>
      <AccentText>{label}</AccentText>
    </div>
  )
}
