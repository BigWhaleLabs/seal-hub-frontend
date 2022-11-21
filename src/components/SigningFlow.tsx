import { ErrorType, ThrownError, errorList } from 'models/ErrorType'
import { Phase } from 'models/FlowPhase'
import { Signer } from 'ethers'
import { generateInput } from 'helpers/proofs/createProof'
import { margin } from 'classnames/tailwind'
import { useAccount, useSigner } from 'wagmi'
import { useCallback, useEffect } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Button from 'components/Button'
import ErrorBlock from 'components/ErrorBlock'
import SigningStates, { STATES } from 'models/SigningStates'
import StatusBlock from 'components/StatusBlock'
import getCommitment from 'helpers/getCommitment'
import hasCommitment from 'helpers/hasCommitment'
import isMobileDevice from 'helpers/isMobile'
import signMessage from 'helpers/signMessage'
import supportsModuleWorkers from 'helpers/supportsModuleWorkers'

function SignError({
  onClick,
}: {
  onClick: () => Promise<void | null | undefined>
}) {
  return (
    <div className={margin('mx-auto')}>
      <Button onClick={onClick} fitContent>
        Sign again
      </Button>
    </div>
  )
}

export default function () {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { flowState, error } = useSnapshot(AppStore)
  const startCheckingAddress = useCallback(
    async (signer: Signer) => {
      if (!address) {
        AppStore.error = ErrorType.CONNECTION
        return
      }
      AppStore.error = undefined
      AppStore.phase = Phase.CHECK

      try {
        const { baseMessage, signature } = await signMessage(address, signer)

        AppStore.message = baseMessage
        AppStore.signature = signature

        AppStore.flowState = STATES.CHECK_COMMITMENT

        if (supportsModuleWorkers()) {
          const { generateInput } = new ComlinkWorker<
            typeof import('../helpers/proofs/createProof')
          >(new URL('../helpers/proofs/createProof', import.meta.url))
          AppStore.input = await generateInput(signature, baseMessage)
        } else {
          AppStore.input = generateInput(signature, baseMessage)
        }

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
        AppStore.phase = isMobileDevice()
          ? Phase.READY_CENTRALIZED
          : Phase.READY_DECENTRALIZED
      } catch (e) {
        AppStore.error = (e as unknown as ThrownError).type
        console.error(e)
      }
    },
    [address]
  )
  const reSignMessage = async () =>
    signer && (await startCheckingAddress(signer))

  useEffect(() => {
    if (!AppStore.input && signer) void startCheckingAddress(signer)
  }, [signer, startCheckingAddress])

  const { title, subTitle } = SigningStates[flowState]

  return error ? (
    <ErrorBlock
      subtitle={errorList[error]}
      content={<SignError onClick={reSignMessage} />}
    />
  ) : (
    <StatusBlock loadingText={title} subtitle={subTitle} />
  )
}
