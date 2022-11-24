import { ErrorType, ThrownError, errorList } from 'models/ErrorType'
import { Phase } from 'models/FlowPhase'
import { Signer } from 'ethers'
import { generateInput } from 'helpers/proofs/createProof'
import { margin } from 'classnames/tailwind'
import { useAccount, useSigner } from 'wagmi'
import { useCallback, useEffect } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Button from 'components/Common/Button'
import ErrorBlock from 'components/Common/ErrorBlock'
import SigningStates, { States } from 'models/SigningStates'
import StatusBlock from 'components/Common/StatusBlock'
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
        AppStore.error = ErrorType.connection
        return
      }
      AppStore.error = undefined
      AppStore.phase = Phase.check

      try {
        const { baseMessage, signature } = await signMessage(address, signer)

        AppStore.message = baseMessage
        AppStore.signature = signature

        AppStore.flowState = States.checkCommitment

        if (supportsModuleWorkers()) {
          const { generateInput } = new ComlinkWorker<
            typeof import('../../helpers/proofs/createProof')
          >(new URL('./../../../helpers/proofs/createProof', import.meta.url))
          AppStore.input = await generateInput(signature, baseMessage)
        } else {
          AppStore.input = generateInput(signature, baseMessage)
        }

        if (!AppStore.input) return
        AppStore.commitment = await getCommitment(
          AppStore.input,
          signature,
          baseMessage
        )

        if (AppStore.commitment && (await hasCommitment(AppStore.commitment))) {
          AppStore.phase = Phase.success
          return
        }

        AppStore.flowState = States.readyProofGenerating
        AppStore.phase = isMobileDevice()
          ? Phase.readyCentralized
          : Phase.readyDecentralized
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
