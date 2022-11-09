import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { SealHub__factory } from '@big-whale-labs/seal-hub-contract'
import { Signer, Wallet } from 'ethers'
import { hashPersonalMessage } from '@ethereumjs/util'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { useEffect } from 'preact/hooks'
import { useState } from 'react'
import AppStore from 'stores/AppStore'
import StatusBlock from 'components/StatusBlock'
import buffer from 'buffer'
import createProof from 'helpers/createProof'
import env from 'helpers/env'
import getSealHubGSN from 'helpers/getSealHubGSN'
import makeTransaction from 'helpers/makeTransaction'

const { Buffer } = buffer
if (!window.Buffer) window.Buffer = Buffer

enum STATES {
  INIT,
  CHECK_COMMITMENT,
}

const states = {
  [STATES.INIT]: {
    title: 'Waiting for signature',
    subTitle: 'We’re requesting your signature to generate your commitment.',
  },
  [STATES.CHECK_COMMITMENT]: {
    title: 'Checking for existing commitment...',
    subTitle: 'Hang tight!',
  },
}

export default function () {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const provider = useProvider()
  const [state, setState] = useState(STATES.INIT)

  useEffect(() => {
    const baseMessage = `SealHub verification for ${address}`

    async function start(signer: Signer) {
      try {
        AppStore.flowInit = true
        const readContract = SealHub__factory.connect(
          env.VITE_SEAL_HUB,
          provider
        )
        const messageHash = hashPersonalMessage(Buffer.from(baseMessage))
        const signature = await signer.signMessage(messageHash)
        setState(STATES.CHECK_COMMITMENT)
        const proof = await createProof(signature, baseMessage)
        const txData = makeTransaction(proof)
        const hash = txData.input[0]
        if (!(await readContract.commitmentMap(hash))) {
          const writeContract = await getSealHubGSN(
            Wallet.createRandom().connect(provider)
          )

          const tx = await writeContract.createCommitment(
            txData as unknown as ECDSAProofStruct
          )

          await tx.wait()
        }
        AppStore.flowSucceeded = true
      } finally {
        AppStore.flowInit = false
        setState(STATES.INIT)
      }
    }

    if (!AppStore.flowInit && signer) void start(signer)
  }, [address, signer, provider])

  const { title, subTitle } = states[state]

  return <StatusBlock loadingText={title} subtitle={subTitle} />
}
