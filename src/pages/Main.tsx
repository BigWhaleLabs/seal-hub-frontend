import { STATES } from 'types/SigningStates'
import { useAccount } from 'wagmi'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import BeforeGeneration from 'components/BeforeGeneration'
import BottomCard from 'components/BottomCard'
import GettingStartedBlock from 'components/GettingStartedBlock'
import SigningFlow from 'components/SigningFlow'
import SuccessCardBlock from 'components/SuccessCard/SuccessCardBlock'
import TopCard from 'components/TopCard'
import ZKFloof from 'components/ZKFloof'
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
  const { address } = useAccount()
  const { input, flowSucceeded, flowState } = useSnapshot(AppStore)
  const label = flowSucceeded
    ? 'Complete'
    : address
    ? 'Ready to anonymize'
    : '100% ANONYMOUS'
  const title = flowSucceeded
    ? 'Your wallet is verified'
    : address
    ? 'Before you start ZKP generation'
    : 'Verify, and stay anonymous'
  const subtitle = flowSucceeded ? (
    <>
      You can add another wallet’s commitment. Disconnect wallet and add
      commitment for another wallet
    </>
  ) : flowState === STATES.READY_FOR_GENERATING_PROOF ? (
    <BeforeGeneration />
  ) : (
    <>
      SealHub allows anyone to prove they own a wallet without exposing their
      identity—not even we’ll know who you are.
    </>
  )
  ;('This is a heavy process on your machine. It might help to close other programs or browser tabs before beginning. It also may take some time, so feel free to come back to this page during generation. Once ZKP is created, we’ll add it to the chain immediately. ')
  const content = flowSucceeded ? (
    <SuccessCardBlock />
  ) : input ? (
    <ZKFloof />
  ) : address ? (
    <SigningFlow />
  ) : (
    <GettingStartedBlock />
  )

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
