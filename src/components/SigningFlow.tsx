import { Phase } from 'types/flowPhase'
import { Signer } from 'ethers'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { useEffect } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import SigningStates, { STATES } from 'types/SigningStates'
import StatusBlock from 'components/StatusBlock'
import getCommitment from 'helpers/getCommitment'
import hasCommitment from 'helpers/hasCommitment'
import signMessage from 'helpers/signMessage'

export default function () {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const provider = useProvider()
  const { flowState } = useSnapshot(AppStore)

  useEffect(() => {
    async function startCheckingAddress(signer: Signer) {
      if (!address) return
      AppStore.phase = Phase.CHECK

      try {
        const { baseMessage, signature } = await signMessage(address, signer)

        AppStore.flowState = STATES.CHECK_COMMITMENT
        const instance = new ComlinkWorker<
          typeof import('../helpers/createProof')
        >(new URL('../helpers/createProof', import.meta.url))

        AppStore.input = await instance.generateInput(signature, baseMessage)
        AppStore.commitment = await getCommitment(
          AppStore.input,
          signature,
          baseMessage
        )

        if (AppStore.commitment && (await hasCommitment(AppStore.commitment))) {
          AppStore.phase = Phase.SUCCESS
          return
        }

        AppStore.flowState = STATES.READY_FOR_GENERATING_PROOF
        AppStore.phase = Phase.READY
      } catch (e) {
        AppStore.flowState = STATES.ERROR
        console.error(e)
      }
    }

    if (!AppStore.input && signer) void startCheckingAddress(signer)
  }, [address, signer, provider])

  const { title, subTitle } = SigningStates[flowState]

  return <StatusBlock loadingText={title} subtitle={subTitle} />
}
