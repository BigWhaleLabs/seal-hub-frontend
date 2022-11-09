import { AccentText, BodyText, HeaderText } from 'components/Text'
import { JSX } from 'preact/jsx-runtime'
import { basicCardStyles } from 'components/Card'
import DashedDividers from 'components/DashedDividers'
import classnames, {
  borderColor,
  boxShadowColor,
  gap,
  space,
} from 'classnames/tailwind'

interface TopCardProps {
  label: string
  title: string
  subtitle?: string | JSX.Element
  statusOrContent?: string | JSX.Element
}

const wrapper = classnames(
  basicCardStyles,
  gap('gap-y-8'),
  borderColor('border-accent'),
  boxShadowColor('shadow-accent-semi-transparent')
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
