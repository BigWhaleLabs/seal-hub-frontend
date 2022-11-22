export enum States {
  ERROR = 'ERROR',
  INIT = 'INIT',
  CHECK_COMMITMENT = 'CHECK_COMMITMENT',
  READY_FOR_GENERATING_PROOF = 'READY_FOR_GENERATING_PROOF',
  GENERATE_PROOF = 'GENERATE_PROOF',
  GENERATE_COMMITMENT = 'GENERATE_COMMITMENT',
}

export interface StateObject {
  title: string
  subTitle: string
  beforeStart?: string
  loadingText?: string
  completedText?: string
}

export const generatingFlow = [
  States.CHECK_COMMITMENT,
  States.GENERATE_PROOF,
  States.GENERATE_COMMITMENT,
]

export default {
  [States.ERROR]: {
    title: 'Error',
    subTitle: 'Try again',
  },
  [States.INIT]: {
    title: 'Waiting for signature',
    subTitle: 'We’re requesting your signature to generate your commitment.',
  },
  [States.CHECK_COMMITMENT]: {
    title: 'Checking for existing commitment...',
    completedText: 'Commitment generated',
    subTitle: 'Hang tight!',
  },
  [States.READY_FOR_GENERATING_PROOF]: {
    title: 'Wait for approve...',
    subTitle: 'Ready to begin...',
  },
  [States.GENERATE_PROOF]: {
    title: 'Generate proof...',
    beforeStart: 'Generate zero knowledge proof',
    loadingText: 'Generating zero knowledge proof',
    completedText: 'ZKP generated',
    subTitle: 'Hang tight, this whole process may take 5-20 minutes.',
  },
  [States.GENERATE_COMMITMENT]: {
    title: 'Generate commitment...',
    beforeStart: 'Add to chain',
    loadingText: 'Adding to blockchain',
    subTitle: 'Almost there',
  },
} as {
  [key in States]: StateObject
}
