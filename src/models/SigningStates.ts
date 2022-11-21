export enum STATES {
  ERROR,
  INIT,
  CHECK_COMMITMENT,
  READY_FOR_GENERATING_PROOF,
  GENERATE_PROOF,
  GENERATE_COMMITMENT,
}

export default {
  [STATES.ERROR]: {
    title: 'Error',
    subTitle: 'Try again',
  },
  [STATES.INIT]: {
    title: 'Waiting for signature',
    subTitle: 'We’re requesting your signature to generate your commitment.',
  },
  [STATES.CHECK_COMMITMENT]: {
    title: 'Checking for existing commitment...',
    subTitle: 'Hang tight!',
  },
  [STATES.READY_FOR_GENERATING_PROOF]: {
    title: 'Wait for approve...',
    subTitle: 'Ready to begin...',
  },
  [STATES.GENERATE_PROOF]: {
    title: 'Generate proof...',
    subTitle: 'Hang tight, this whole process may take 5-20 minutes.',
  },
  [STATES.GENERATE_COMMITMENT]: {
    title: 'Generate commitment...',
    subTitle: 'Almost there',
  },
} as {
  [key in STATES]: { title: string; subTitle: string }
}
