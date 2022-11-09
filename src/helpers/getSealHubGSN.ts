import { SealHub__factory } from '@big-whale-labs/seal-hub-contract'
import { Signer } from 'ethers'
import { wrapContract } from '@opengsn/provider/dist/WrapContract'
import env from 'helpers/env'

export default function (signer: Signer) {
  const writeContract = SealHub__factory.connect(env.VITE_SEAL_HUB, signer)

  return wrapContract(writeContract, {
    paymasterAddress: env.VITE_GSN_PAYMASTER_CONTRACT_ADDRESS,
    preferredRelays: [env.VITE_GSN_SC_RELAY],
    blacklistedRelays: ['https://goerli.v3.opengsn.org/v3'],
  })
}
