import { ErrorType } from 'types/ErrorType'
import { ProofInput } from 'models/ProofInput'
import { recoverPublicKey } from 'ethers/lib/utils'
import { utils } from 'ethers'
import Mimc7 from 'models/Mimc7'
import publicKeyToArraysSplitted from 'helpers/publicKeyToArraysSplitted'

export default async function getCommitment(
  inputs: ProofInput,
  signature: string,
  baseMessage: string
) {
  try {
    const k = 4
    const prepHash: (string | bigint)[] = []

    const msgHash = utils.hashMessage(baseMessage)
    const msgHashBytes = utils.arrayify(msgHash)
    const publicKey = recoverPublicKey(msgHashBytes, signature)

    const [x, y] = publicKeyToArraysSplitted(publicKey)

    for (let i = 0; i < k; i++) {
      prepHash[i] = inputs.s[0][i]
      prepHash[k + i] = inputs.U[0][i]
      prepHash[2 * k + i] = inputs.U[1][i]
      prepHash[3 * k + i] = x[i]
      prepHash[4 * k + i] = y[i]
    }

    const hashInput = prepHash.flat().map((v) => BigInt(v))
    const mimc7 = await new Mimc7().prepare()

    return mimc7.hash(hashInput)
  } catch (e) {
    console.error(e)
    throw { type: ErrorType.COMMITMENT, error: e }
  }
}
