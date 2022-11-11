import { Phase, PhaseContext } from 'types/flowPhase'
import BeforeGeneration from 'components/BeforeGeneration'
import GettingStartedBlock from 'components/GettingStartedBlock'
import SigningFlow from 'components/SigningFlow'
import SuccessCardBlock from 'components/SuccessCard/SuccessCardBlock'
import SuccessSubtitle from 'components/SuccessCard/SuccessSubtitle'
import ZKFlow from 'components/ZKFlow'

const phaseData: { [key: string]: PhaseContext } = {
  [Phase.INIT]: {
    label: '// 100% ANONYMOUS',
    title: 'Verify, and stay anonymous',
    subtitle:
      'SealHub allows anyone to prove they own a wallet without exposing their identity—not even we’ll know who you are.',
    content: <GettingStartedBlock />,
  },
  [Phase.CHECK]: {
    label: '// 100% ANONYMOUS',
    title: 'Verify, and stay anonymous',
    subtitle:
      'SealHub allows anyone to prove they own a wallet without exposing their identity—not even we’ll know who you are.',
    content: <SigningFlow />,
  },
  [Phase.READY]: {
    label: 'Ready to anonymize',
    title: 'Before you start ZKP generation',
    subtitle: <BeforeGeneration />,
    content: <ZKFlow />,
  },
  [Phase.GENERATE]: {
    label: 'Ready to anonymize',
    title: 'Generating ZKP',
    content: <ZKFlow />,
  },
  [Phase.SUCCESS]: {
    label: '// Complete',
    title: 'Your wallet is verified',
    subtitle: <SuccessSubtitle />,
    content: <SuccessCardBlock />,
  },
}

export default phaseData
