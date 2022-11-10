import { Signer } from 'ethers'
import { hashPersonalMessage } from '@ethereumjs/util'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { useEffect } from 'preact/hooks'
import { useState } from 'react'
import AppStore from 'stores/AppStore'
import SigningStates, { STATES } from 'types/SigningStates'
import StatusBlock from 'components/StatusBlock'
import createProof from 'helpers/createProof'
import getSealHubGSN from 'helpers/getSealHubGSN'
import makeTransaction from 'helpers/makeTransaction'
import sealHub from 'helpers/sealHub'

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

  const { title, subTitle } = SigningStates[state]

  return <StatusBlock loadingText={title} subtitle={subTitle} />
}
