import { Phase, PhaseContext } from 'models/FlowPhase'
import CentralizedFlow from 'components/Flow/CentralizedFlow'
import CentralizedProver from 'components/BeforeGeneration/CentralizedProver'
import DecentralizedFlow from 'components/Flow/DecentralizedFlow'
import DecentralizedProver from 'components/BeforeGeneration/DecentralizedProver'
import GettingStartedBlock from 'components/Common/GettingStartedBlock'
import SigningFlow from 'components/Flow/SigningFlow'
import SuccessCardBlock from 'components/SuccessCard/SuccessCardBlock'
import SuccessSubtitle from 'components/SuccessCard/SuccessSubtitle'

const phaseData: { [key: string]: PhaseContext } = {
  [Phase.init]: {
    label: '// 100% ANONYMOUS',
    title: 'Verify, and stay anonymous',
    subtitle:
      'SealHub allows anyone to prove they own a wallet without exposing their identity—not even we’ll know who you are.',
    content: <GettingStartedBlock />,
  },
  [Phase.check]: {
    label: '// 100% ANONYMOUS',
    title: 'Verify, and stay anonymous',
    subtitle:
      'SealHub allows anyone to prove they own a wallet without exposing their identity—not even we’ll know who you are.',
    content: <SigningFlow />,
  },
  [Phase.readyDecentralized]: {
    label: 'Ready to anonymize',
    title: 'Before you start ZKP generation',
    subtitle: <DecentralizedProver />,
    content: <DecentralizedFlow />,
  },
  [Phase.readyCentralized]: {
    label: 'Ready to anonymize',
    title: 'To continue, you’ll need to choose a path for ZKP generation',
    subtitle: <CentralizedProver />,
    content: <CentralizedFlow />,
  },
  [Phase.generate]: {
    label: 'Ready to anonymize',
    title: 'Generating ZKP',
    content: <DecentralizedFlow />,
  },
  [Phase.addToChain]: {
    label: 'Ready to anonymize',
    title: 'Getting your commitment on chain',
    content: <DecentralizedFlow />,
  },
  [Phase.success]: {
    label: '// Complete',
    title: 'Your wallet is verified',
    subtitle: <SuccessSubtitle />,
    content: <SuccessCardBlock />,
  },
}

export default phaseData
