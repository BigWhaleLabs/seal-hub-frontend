import { AccentText, HeaderText } from 'components/Text'
import { JSX } from 'preact/jsx-runtime'
import DashedDividers from 'src/components/DashedDividers'
import classnames, {
  backgroundColor,
  display,
  flexDirection,
  gap,
  padding,
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
  gap('gap-y-6'),
  backgroundColor('bg-primary-dark'),
  padding('py-8', 'px-6')
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
      <HeaderText>{title}</HeaderText>
      {subtitle}
      <DashedDividers />
      {statusOrContent}
    </div>
  )
}
