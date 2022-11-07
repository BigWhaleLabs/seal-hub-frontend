import BottomCard from 'components/BottomCard'
import StatusBlock from 'components/StatusBlock'
import TopCard from 'components/TopCard'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  gap('gap-y-8')
)
export default function () {
  return (
    <div className={container}>
      <TopCard
        label="// 100% ANONYMOUS"
        title="Verify, and stay anonymous"
        subtitle="SealHub allows anyone to prove they own a wallet without exposing their identity—not even we’ll know who you are."
        statusOrContent={
          <StatusBlock
            loadingText="Checking for existing commitment..."
            subtitle="Hang tight!"
          />
        }
      />
      <BottomCard />
    </div>
  )
}
