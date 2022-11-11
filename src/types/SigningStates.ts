export enum STATES {
  ERROR,
  INIT,
  CHECK_COMMITMENT,
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
  [STATES.GENERATE_PROOF]: {
    title: 'Generate proof...',
    subTitle: 'Hang tight!',
  },
  [STATES.GENERATE_COMMITMENT]: {
    title: 'Generate commitment...',
    subTitle: 'Hang tight!',
  },
}
