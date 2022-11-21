import { AccentText, BodyText, HeaderText } from 'components/Text'
import { JSX } from 'preact/jsx-runtime'
import { space } from 'classnames/tailwind'
import Card from 'components/Card'
import DashedDividers from 'components/DashedDividers'

interface TopCardProps {
  label?: string
  title?: string
  subtitle?: string | JSX.Element | null
  statusOrContent?: string | JSX.Element
}

export default function ({
  label,
  title,
  subtitle,
  statusOrContent,
}: TopCardProps) {
  return (
    <Card accent bigGap>
      {label ? <AccentText>{label}</AccentText> : undefined}
      <div className={space('space-y-2')}>
        {title ? <HeaderText>{title}</HeaderText> : undefined}
        <BodyText>{subtitle}</BodyText>
      </div>
      <DashedDividers />
      {statusOrContent}
    </Card>
  )
}
