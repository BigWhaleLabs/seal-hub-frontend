import { ProofInput } from 'models/ProofInput'
import { publicKeyToArraysSplitted } from 'helpers/createProof'
import _ from 'lodash'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildBabyjub, buildMimc7 } from 'circomlibjs'

class Mimc7 {
  private babyJub: any
  F: any
  private mimc7: any

  async prepare() {
    this.babyJub = await buildBabyjub()
    this.F = this.babyJub.F
    this.mimc7 = await buildMimc7()
    return this
  }
  hash(elements: any[] | Uint8Array) {
    return this.F.toObject(this.mimc7.multiHash.bind(this.mimc7)(elements))
  }
  hashWithoutBabyJub(elements: any[] | Uint8Array) {
    return this.mimc7.multiHash.bind(this.mimc7)(elements)
  }
}

export default async function getCommitment(
  inputs: ProofInput,
  publicKey: string
) {
  const k = 4
  const prepHash = []

  const pubKey = publicKeyToArraysSplitted(publicKey)

  for (let i = 0; i < k; i++) {
    prepHash[i] = inputs.s[i]
    prepHash[k + i] = inputs.U[0][i]
    prepHash[2 * k + i] = inputs.U[1][i]
    prepHash[3 * k + i] = pubKey[0][i]
    prepHash[4 * k + i] = pubKey[1][i]
  }

  const hashInput = _.flattenDeep(prepHash.filter((item) => item)).map((v) =>
    BigInt(v)
  )

  const mimc7 = await new Mimc7().prepare()

  return mimc7.hash(hashInput)
}
