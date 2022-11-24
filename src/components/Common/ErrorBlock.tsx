import { AccentText, BodyText } from 'components/Common/Text'
import { JSX } from 'preact/jsx-runtime'
import StatusCard from 'components/Common/StatusCard'

export default function ({
  transparent,
  subtitle,
  content,
}: {
  transparent?: boolean
  subtitle?: string | JSX.Element
  content?: JSX.Element
  fallback?: () => void
}) {
  return (
    <>
      <StatusCard transparent={transparent}>
        {subtitle && typeof subtitle === 'string' ? (
          <AccentText color="text-error">
            <BodyText>{subtitle}</BodyText>
          </AccentText>
        ) : (
          subtitle
        )}
      </StatusCard>
      {content}
    </>
  )
}
