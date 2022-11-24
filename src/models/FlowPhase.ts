import { JSX } from 'preact'

export interface PhaseContext {
  label: string
  title: string
  subtitle?: string | JSX.Element
  content: JSX.Element
}

export enum Phase {
  init = 'init',
  check = 'checkCommitment',
  readyDecentralized = 'readyDecentralized',
  readyCentralized = 'readyCentralized',
  generate = 'generateProof',
  addToChain = 'addToChain',
  success = 'success',
}
