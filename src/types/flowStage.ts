import { JSX } from 'preact'
export interface StageContext {
  label: string
  title: string
  subtitle?: string | JSX.Element
  content: JSX.Element
}

export enum STAGE {
  INIT = 'INIT',
  CHECK = 'CHECK_COMMITMENT',
  READY = 'READY_FOR_GENERATING_PROOF',
  GENERATE = 'GENERATE_PROOF',
  SUCCESS = 'SUCCESS',
}
