import { JSX } from 'preact'

export interface PhaseContext {
  label: string
  title: string
  subtitle?: string | JSX.Element
  content: JSX.Element
}

export enum Phase {
  INIT = 'INIT',
  CHECK = 'CHECK_COMMITMENT',
  READY_DECENTRALIZED = 'READY_FOR_GENERATING_PROOF_DECENTRALIZED',
  READY_CENTRALIZED = 'READY_FOR_GENERATING_PROOF_CENTRALIZED',
  GENERATE = 'GENERATE_PROOF',
  ADD_TO_CHAIN = 'ADD_TO_CHAIN',
  SUCCESS = 'SUCCESS',
}
