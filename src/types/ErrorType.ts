export interface ThrownError {
  type: ErrorType
  error: unknown
}

export enum ErrorType {
  CONNECTION = 'CONNECTION',
  SIGNATURE = 'SIGNATURE',
  COMMITMENT = 'COMMITMENT',
  PROVER = 'PROVER',
  ZKP = 'ZKP',
  CHAIN = 'CHAIN',
}

export const errorList = {
  [ErrorType.CONNECTION]: 'Failed to connect. Please try again.',
  [ErrorType.SIGNATURE]: 'Signature request rejected. Please try again.',
  [ErrorType.COMMITMENT]: 'Commitment check failed.',
  [ErrorType.PROVER]:
    'The prover URL you added is invalid. Please check for any errors and try again.',
  [ErrorType.ZKP]: 'Your generation of ZKP failed. Please try again.',
  [ErrorType.CHAIN]: 'Try again with the same ZKP?',
}