import { Signer } from 'ethers'
import { hashPersonalMessage } from '@ethereumjs/util'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { useEffect } from 'preact/hooks'
import { useState } from 'react'
import AppStore from 'stores/AppStore'
import StatusBlock from 'components/StatusBlock'
import buffer from 'buffer'
import createProof from 'helpers/createProof'
import getSealHubGSN from 'helpers/getSealHubGSN'
import makeTransaction from 'helpers/makeTransaction'
import sealHub from 'helpers/sealHub'

const { Buffer } = buffer
if (!window.Buffer) window.Buffer = Buffer

enum STATES {
  ERROR,
  INIT,
  CHECK_COMMITMENT,
  GENERATE_COMMITMENT,
}

const states = {
  [STATES.ERROR]: {
    title: 'Error',
    subTitle: 'Try again',
  },
  [STATES.INIT]: {
    title: 'Waiting for signature',
    subTitle: 'We’re requesting your signature to generate your commitment.',
  },
  [STATES.CHECK_COMMITMENT]: {
    title: 'Checking for existing commitment...',
    subTitle: 'Hang tight!',
  },
  [STATES.GENERATE_COMMITMENT]: {
    title: 'Generate commitment...',
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
        const messageHash = hashPersonalMessage(Buffer.from(baseMessage))
        const signature = await signer.signMessage(messageHash)
        setState(STATES.CHECK_COMMITMENT)
        const proof = await createProof(signature, baseMessage)
        const txData = makeTransaction(proof)
        const hash = txData.input[0]
        if (!(await sealHub.commitmentMap(hash))) {
          setState(STATES.GENERATE_COMMITMENT)
          const sealHubGSN = await getSealHubGSN()
          const tx = await sealHubGSN.createCommitment(txData)
          await tx.wait()
        }
        AppStore.flowSucceeded = true
      } catch (e) {
        AppStore.flowInit = false
        setState(STATES.ERROR)
        console.error(e)
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
