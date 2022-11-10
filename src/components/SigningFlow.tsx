import { Signer } from 'ethers'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { useEffect } from 'preact/hooks'
import { useState } from 'react'
import AppStore from 'stores/AppStore'
import SigningStates, { STATES } from 'types/SigningStates'
import StatusBlock from 'components/StatusBlock'
import generateCommitment from 'helpers/generateCommitment'
import generateProof from 'helpers/generateProof'
import signMessage from 'helpers/signMessage'

export default function () {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const provider = useProvider()
  const [state, setState] = useState(STATES.INIT)

  useEffect(() => {
    async function start(signer: Signer) {
      if (!address) return
      try {
        AppStore.flowInit = true

        const { baseMessage, signature } = await signMessage(address, signer)
        setState(STATES.CHECK_COMMITMENT)
        const { hasCommitment, txData } = await generateProof(
          signature,
          baseMessage
        )
        if (hasCommitment) {
          AppStore.flowSucceeded = true
          return
        }

        setState(STATES.GENERATE_COMMITMENT)
        await generateCommitment(txData)
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
