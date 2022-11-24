import StateObject from 'models/StateObject'

export enum States {
  error = 'Error',
  init = 'Init',
  checkCommitment = 'Check commitment',
  readyProofGenerating = 'Ready for generating proof',
  generateProof = 'Generate proof',
  generateCommitment = 'Generate commitment',
}

export const generatingFlow = [
  States.checkCommitment,
  States.generateProof,
  States.generateCommitment,
]

export default {
  [States.error]: {
    title: 'Error',
    subTitle: 'Try again',
  },
  [States.init]: {
    title: 'Waiting for signature',
    subTitle: 'We’re requesting your signature to generate your commitment.',
  },
  [States.checkCommitment]: {
    title: 'Checking for existing commitment...',
    completedText: 'Commitment generated',
    subTitle: 'Hang tight!',
  },
  [States.readyProofGenerating]: {
    title: 'Wait for approve...',
    subTitle: 'Ready to begin...',
  },
  [States.generateProof]: {
    title: 'Generate proof...',
    beforeStart: 'Generate zero knowledge proof',
    loadingText: 'Generating zero knowledge proof',
    completedText: 'ZKP generated',
    subTitle: 'Hang tight, this whole process may take 5-20 minutes.',
  },
  [States.generateCommitment]: {
    title: 'Generate commitment...',
    beforeStart: 'Add to chain',
    loadingText: 'Adding to blockchain',
    subTitle: 'Almost there',
  },
} as {
  [key in States]: StateObject
}
