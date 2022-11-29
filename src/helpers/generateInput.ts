import { generateSignatureInputs } from '@big-whale-labs/seal-hub-kit'

export default function generateInput(signature: string, message: string) {
  const { s, U, TPreComputes } = generateSignatureInputs(signature, message)

  return { s, U, TPreComputes }
}
