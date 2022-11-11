import { STAGE } from 'types/flowStage'
import { Signer } from 'ethers'
import { generateInput } from 'helpers/createProof'
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
    async function start(signer: Signer) {
      if (!address) return
      AppStore.stage = STAGE.CHECK

      try {
        const { baseMessage, signature } = await signMessage(address, signer)

        AppStore.flowState = STATES.CHECK_COMMITMENT
        AppStore.input = generateInput(signature, baseMessage)
        AppStore.commitment = await getCommitment(
          AppStore.input,
          signature,
          baseMessage
        )

        if (AppStore.commitment && (await hasCommitment(AppStore.commitment))) {
          AppStore.flowSucceeded = true
          AppStore.stage = STAGE.SUCCESS
          return
        }

        AppStore.flowState = STATES.READY_FOR_GENERATING_PROOF
        AppStore.stage = STAGE.READY
      } catch (e) {
        AppStore.flowState = STATES.ERROR
        console.error(e)
      }
    }

    if (!AppStore.input && signer) void start(signer)
  }, [address, signer, provider])

  const { title, subTitle } = SigningStates[flowState]

  return <StatusBlock loadingText={title} subtitle={subTitle} />
}
