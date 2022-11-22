import { JSX } from 'preact'

export interface PhaseContext {
  label: string
  title: string
  subtitle?: string | JSX.Element
  content: JSX.Element
}

export enum Phase {
  init = 'Init',
  check = 'Check commitment',
  readyDecentralized = 'Ready for generating proof decentralized',
  readyCentralized = 'Ready for generating proof centralized',
  generate = 'Generate proof',
  addToChain = 'Add to chain',
  success = 'Success',
}
