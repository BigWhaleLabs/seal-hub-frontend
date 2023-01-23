import { getSealHubInputs } from '@big-whale-labs/seal-hub-kit'

export default function generateInput(signature: string, message: string) {
  return getSealHubInputs(signature, message)
}
