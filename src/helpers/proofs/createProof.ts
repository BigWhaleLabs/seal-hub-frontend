import ProofInput from 'models/ProofInput'
import ProofResult from 'models/ProofResult'
import getECDSACheckerFiles from 'helpers/getECDSACheckerFiles'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default async function (input: ProofInput): Promise<ProofResult[]> {
  const [wasm, zkey, wasmUPrecomputes, zkeyUPrecomputes] =
    await getECDSACheckerFiles()

  const { T, U, s, scalarForT, TPrecomputes, rInv } = input

  return Promise.all([
    snarkjs.groth16.fullProve(
      { T, U, s, scalarForT, TPrecomputes },
      wasm,
      zkey
    ),
    snarkjs.groth16.fullProve({ U, rInv }, wasmUPrecomputes, zkeyUPrecomputes),
  ])
}
