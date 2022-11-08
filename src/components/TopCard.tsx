import { AccentText, BodyText, HeaderText } from 'components/Text'
import { JSX } from 'preact/jsx-runtime'
import DashedDividers from 'components/DashedDividers'
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
  display,
  flexDirection,
  gap,
  padding,
  space,
  width,
} from 'classnames/tailwind'

interface TopCardProps {
  label: string
  title: string
  subtitle?: string | JSX.Element
  statusOrContent?: string | JSX.Element
}

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-8'),
  backgroundColor('bg-primary-dark'),
  padding('py-8', 'px-6'),
  borderRadius('rounded-2xl'),
  borderWidth('border'),
  borderColor('border-accent'),
  boxShadow('shadow-card'),
  boxShadowColor('shadow-accent-semi-transparent'),
  width('w-full')
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
      <div className={space('space-y-2')}>
        <HeaderText>{title}</HeaderText>
        <BodyText>{subtitle}</BodyText>
      </div>
      <DashedDividers />
      {statusOrContent}
    </div>
  )
}
