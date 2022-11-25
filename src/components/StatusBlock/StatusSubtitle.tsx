import { AccentText, BodyText } from 'components/Common/Text'
import { JSX } from 'preact/jsx-runtime'

export default function ({
  error,
  subtitle,
}: {
  error?: boolean
  subtitle: string | JSX.Element
}) {
  return typeof subtitle === 'string' ? (
    <AccentText color={error ? 'text-error' : 'text-formal-accent'}>
      <BodyText>{subtitle}</BodyText>
    </AccentText>
  ) : (
    subtitle
  )
}
