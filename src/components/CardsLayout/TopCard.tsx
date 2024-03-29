import { AccentText, BodyText, HeaderText } from 'components/Common/Text'
import { JSX } from 'preact/jsx-runtime'
import { space } from 'classnames/tailwind'
import Card from 'components/Common/Card'
import DashedDividers from 'components/Common/DashedDividers'

interface TopCardProps {
  label?: string
  title?: string
  subtitle?: string | JSX.Element | null
  statusOrContent?: string | JSX.Element
}

export default function ({
  label,
  statusOrContent,
  subtitle,
  title,
}: TopCardProps) {
  return (
    <Card accent bigGap>
      {label ? <AccentText>{label}</AccentText> : undefined}
      <div className={space('space-y-2')}>
        {title ? <HeaderText>{title}</HeaderText> : undefined}
        {subtitle && <BodyText>{subtitle}</BodyText>}
      </div>
      <DashedDividers />
      {statusOrContent}
    </Card>
  )
}
