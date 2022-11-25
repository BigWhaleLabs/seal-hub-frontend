import { JSX } from 'preact/jsx-runtime'
import StatusCard from 'components/Common/StatusCard'
import StatusLoading from 'components/StatusBlock/StatusLoading'
import StatusSubtitle from 'components/StatusBlock/StatusSubtitle'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'

const statusCardWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6')
)

export default function ({
  loadingText,
  subtitle = 'Hang tight! We’re fetching the content.',
  completed,
  errorBlock,
  content,
  error,
}: {
  loadingText?: string
  subtitle?: string | JSX.Element
  errorBlock?: JSX.Element
  completed?: boolean
  content?: JSX.Element
  error?: boolean
}) {
  return (
    <div className={statusCardWrapper}>
      <StatusCard>
        {errorBlock}
        <StatusLoading loadingText={loadingText} completed={completed} />
        <StatusSubtitle error={error} subtitle={subtitle} />
      </StatusCard>
      {content}
    </div>
  )
}
