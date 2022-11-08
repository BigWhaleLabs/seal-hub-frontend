import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import BottomCard from 'components/BottomCard'
import GettingStartedBlock from 'components/GettingStartedBlock'
import SuccessCardBlock from 'components/SuccessCard/SuccessCardBlock'
import SuccessSubtitle from 'components/SuccessCard/SuccessSubtitle'
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
  const { flowSucceeded } = useSnapshot(AppStore)
  const label = flowSucceeded ? 'Complete' : '100% ANONYMOUS'
  const title = flowSucceeded
    ? 'Your wallet is verified'
    : 'Verify, and stay anonymous'
  const subtitle = flowSucceeded ? (
    <SuccessSubtitle />
  ) : (
    'SealHub allows anyone to prove they own a wallet without exposing their identity—not even we’ll know who you are.'
  )
  const content = flowSucceeded ? <SuccessCardBlock /> : <GettingStartedBlock />

  return (
    <div className={container}>
      <TopCard
        label={`// ${label}`}
        title={title}
        subtitle={subtitle}
        statusOrContent={content}
      />
      <BottomCard />
    </div>
  )
}
