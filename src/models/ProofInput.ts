import { BigIntOrString } from 'models/BigIntOrString'

export interface ProofInput {
  TPreComputes: BigIntOrString[][][][]
  U: BigIntOrString[][]
  s: BigIntOrString[][]
}
