import { JSX } from 'preact'
import BeforeGeneration from 'components/BeforeGeneration'
import GettingStartedBlock from 'components/GettingStartedBlock'
import SigningFlow from 'components/SigningFlow'
import SuccessCardBlock from 'components/SuccessCard/SuccessCardBlock'
import SuccessSubtitle from 'components/SuccessCard/SuccessSubtitle'
import ZKFloof from 'components/ZKFloof'

export interface StageContext {
  label: string
  title: string
  subtitle?: string | (() => JSX.Element)
  content: () => JSX.Element
}

export enum STAGE {
  INIT = 'INIT',
  CHECK = 'CHECK_COMMITMENT',
  READY = 'READY_FOR_GENERATING_PROOF',
  GENERATE = 'GENERATE_PROOF',
  SUCCESS = 'SUCCESS',
}

export const stageData: { [key: string]: StageContext } = {
  [STAGE.INIT]: {
    label: '// 100% ANONYMOUS',
    title: 'Verify, and stay anonymous',
    subtitle:
      'SealHub allows anyone to prove they own a wallet without exposing their identity—not even we’ll know who you are.',
    content: GettingStartedBlock,
  },
  [STAGE.CHECK]: {
    label: '// 100% ANONYMOUS',
    title: 'Verify, and stay anonymous',
    subtitle:
      'SealHub allows anyone to prove they own a wallet without exposing their identity—not even we’ll know who you are.',
    content: SigningFlow,
  },
  [STAGE.READY]: {
    label: 'Ready to anonymize',
    title: 'Before you start ZKP generation',
    subtitle: BeforeGeneration,
    content: ZKFloof,
  },
  [STAGE.GENERATE]: {
    label: 'Ready to anonymize',
    title: 'Generating ZKP',
    content: ZKFloof,
  },
  [STAGE.SUCCESS]: {
    label: '// Complete',
    title: 'Your wallet is verified',
    subtitle: SuccessSubtitle,
    content: SuccessCardBlock,
  },
}
