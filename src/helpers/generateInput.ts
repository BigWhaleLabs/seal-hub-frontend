/* eslint-disable no-relative-import-paths/no-relative-import-paths */
// Used by worker, which accepts only absolute paths, you can use this function as usual
import { generateSignatureInputs } from '@big-whale-labs/seal-hub-kit'

function generateInput(signature: string, message: string) {
  const { s, U, TPreComputes } = generateSignatureInputs(signature, message)

  return { s, U, TPreComputes }
}

export default generateInput
