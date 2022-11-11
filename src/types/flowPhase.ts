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
  READY = 'READY_FOR_GENERATING_PROOF',
  GENERATE = 'GENERATE_PROOF',
  SUCCESS = 'SUCCESS',
}
