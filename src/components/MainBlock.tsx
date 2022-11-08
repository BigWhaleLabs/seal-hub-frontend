import { StatusBlockCard, Subtitle } from 'components/SuccessBlock'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import BottomCard from 'components/BottomCard'
import GettingStartedBlock from 'components/GettingStartedBlock'
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

  return (
    <div className={container}>
      <TopCard
        label={`// ${flowSucceeded ? 'Complete' : '100% ANONYMOUS'}`}
        title={`${
          flowSucceeded
            ? 'Your wallet is verified'
            : 'Verify, and stay anonymous'
        }`}
        subtitle={
          flowSucceeded ? (
            <Subtitle />
          ) : (
            'SealHub allows anyone to prove they own a wallet without exposing their identity—not even we’ll know who you are.'
          )
        }
        statusOrContent={
          flowSucceeded ? <StatusBlockCard /> : <GettingStartedBlock />
        }
      />
      <BottomCard />
    </div>
  )
}
