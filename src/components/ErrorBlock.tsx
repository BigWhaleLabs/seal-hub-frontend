import { AccentText, BodyText } from 'components/Text'
import { JSX } from 'preact/jsx-runtime'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
  width,
} from 'classnames/tailwind'

const block = (colored?: boolean) =>
  classnames(
    display('flex'),
    backgroundColor({ 'bg-primary-background': colored }),
    flexDirection('flex-col'),
    padding('p-6'),
    alignItems('items-center'),
    justifyContent('justify-between'),
    borderRadius('rounded-lg'),
    gap('gap-y-4'),
    width('w-full')
  )

export default function ({
  colored,
  subtitle,
  content,
}: {
  colored?: boolean
  subtitle?: string | JSX.Element
  content?: JSX.Element
  fallback?: () => void
}) {
  return (
    <>
      <div className={block(colored)}>
        {subtitle && typeof subtitle === 'string' ? (
          <AccentText color="text-error">
            <BodyText>{subtitle}</BodyText>
          </AccentText>
        ) : (
          subtitle
        )}
      </div>
      {content}
    </>
  )
}
