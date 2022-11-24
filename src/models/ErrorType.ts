export function isKnownError(error: unknown): error is ErrorType {
  return typeof error === 'string' && error in ErrorType
}

export interface ThrownError {
  type: ErrorType
  error: unknown
}

export enum ErrorType {
  connection = 'connection',
  signature = 'signature',
  commitment = 'commitment',
  prover = 'prover',
  zkp = 'zkp',
  chain = 'chain',
  missingData = 'missingData',
  unknown = 'unknown',
}

export const errorList = {
  [ErrorType.connection]: 'Failed to connect. Please try again.',
  [ErrorType.signature]: 'Signature request rejected. Please try again.',
  [ErrorType.commitment]: 'Commitment check failed.',
  [ErrorType.prover]:
    'The prover URL you added is invalid. Please check for any errors and try again.',
  [ErrorType.zkp]: 'Your generation of ZKP failed. Please try again.',
  [ErrorType.chain]: 'Try again with the same ZKP?',
  [ErrorType.missingData]:
    'Looks like we miss signature or prover address. Please try again.',
  [ErrorType.unknown]: 'An unknown error occurred. Please try again.',
}
