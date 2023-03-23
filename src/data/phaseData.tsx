import { Phase, PhaseContext } from 'models/FlowPhase'
import CentralizedFlow from 'components/Flow/CentralizedFlow'
import CentralizedProver from 'components/BeforeGeneration/CentralizedProver'
import DecentralizedFlow from 'components/Flow/DecentralizedFlow'
import DecentralizedProver from 'components/BeforeGeneration/DecentralizedProver'
import GettingStartedBlock from 'components/Common/GettingStartedBlock'
import SigningFlow from 'components/SigningFlow'
import SuccessCardBlock from 'components/SuccessCard/SuccessCardBlock'
import SuccessSubtitle from 'components/SuccessCard/SuccessSubtitle'

const phaseData: { [key: string]: PhaseContext } = {
  [Phase.init]: {
    content: <GettingStartedBlock />,
    label: '// 100% ANONYMOUS',
    subtitle:
      'SealHub allows anyone to prove they own a wallet without exposing their identity—not even we’ll know who you are.',
    title: 'Verify, and stay anonymous',
  },
  [Phase.check]: {
    content: <SigningFlow />,
    label: '// 100% ANONYMOUS',
    subtitle:
      'SealHub allows anyone to prove they own a wallet without exposing their identity—not even we’ll know who you are.',
    title: 'Verify, and stay anonymous',
  },
  [Phase.readyDecentralized]: {
    content: <DecentralizedFlow />,
    label: 'Ready to anonymize',
    subtitle: <DecentralizedProver />,
    title: 'Before you start ZKP generation',
  },
  [Phase.readyCentralized]: {
    content: <CentralizedFlow />,
    label: 'Ready to anonymize',
    subtitle: <CentralizedProver />,
    title: 'To continue, you’ll need to choose a path for ZKP generation',
  },
  [Phase.generate]: {
    content: <DecentralizedFlow />,
    label: 'Ready to anonymize',
    title: 'Generating ZKP',
  },
  [Phase.addToChain]: {
    content: <DecentralizedFlow />,
    label: 'Ready to anonymize',
    title: 'Getting your commitment on chain',
  },
  [Phase.success]: {
    content: <SuccessCardBlock />,
    label: '// Complete',
    subtitle: <SuccessSubtitle />,
    title: 'Your wallet is verified',
  },
}

export default phaseData
