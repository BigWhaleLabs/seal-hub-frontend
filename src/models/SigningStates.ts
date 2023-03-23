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
    subTitle: 'Try again',
    title: 'Error',
  },
  [States.init]: {
    subTitle: 'We’re requesting your signature to generate your commitment.',
    title: 'Waiting for signature',
  },
  [States.checkCommitment]: {
    completedText: 'Commitment generated',
    subTitle: 'Hang tight!',
    title: 'Checking for existing commitment...',
  },
  [States.readyProofGenerating]: {
    subTitle: 'Ready to begin...',
    title: 'Wait for approve...',
  },
  [States.generateProof]: {
    beforeStart: 'Generate zero knowledge proof',
    completedText: 'ZKP generated',
    loadingText: 'Generating zero knowledge proof',
    subTitle: 'Hang tight, this whole process may take 5-20 minutes.',
    title: 'Generate proof...',
  },
  [States.generateCommitment]: {
    beforeStart: 'Add to chain',
    loadingText: 'Adding to blockchain',
    subTitle: 'Almost there',
    title: 'Generate commitment...',
  },
} as {
  [key in States]: StateObject
}
