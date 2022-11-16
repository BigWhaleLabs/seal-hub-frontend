import CentralizedBodyRequest from 'types/CentralizedBodyRequest'
import ProofResult from 'models/ProofResult'

export default function (
  input: CentralizedBodyRequest,
  proverAddress: string
): Promise<ProofResult> {
  return fetch(proverAddress, {
    method: 'POST',
    mode: 'same-origin',
    cache: 'default',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(input),
  }).then((response) => {
    if (!response.ok) throw new Error(response.statusText)

    return response.json()
  })
}
