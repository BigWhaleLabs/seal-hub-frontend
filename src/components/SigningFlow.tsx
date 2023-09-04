import { ErrorType, ThrownError, errorList } from 'models/ErrorType'
import { Phase } from 'models/FlowPhase'
import {
  WalletClient,
  useAccount,
  usePublicClient,
  useWalletClient,
} from 'wagmi'
import { Web3Provider } from '@ethersproject/providers'
import {
  getCommitmentFromSignature,
  isCommitmentRegistered,
} from '@big-whale-labs/seal-hub-kit'
import { margin } from 'classnames/tailwind'
import { useCallback, useEffect } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Button from 'components/Common/Button'
import SigningStates, { States } from 'models/SigningStates'
import StatusBlock from 'components/StatusBlock'
import generateInput from 'helpers/generateInput'
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
      <Button fitContent onClick={onClick}>
        Sign again
      </Button>
    </div>
  )
}

export default function () {
  const publicClient = usePublicClient()
  const { address } = useAccount()
  const { data: signer } = useWalletClient()
  const { error, flowState } = useSnapshot(AppStore)
  const startCheckingAddress = useCallback(
    async (signer: WalletClient) => {
      if (!address) {
        AppStore.error = ErrorType.connection
        return
      }
      AppStore.error = undefined
      AppStore.phase = Phase.check

      try {
        const { baseMessage, signature } = await signMessage(signer)

        AppStore.message = baseMessage
        AppStore.signature = signature

        AppStore.flowState = States.checkCommitment

        if (supportsModuleWorkers()) {
          const { default: generateInput } = new ComlinkWorker<
            typeof import('../helpers/generateInput')
          >(new URL('../helpers/generateInput', import.meta.url))
          AppStore.input = await generateInput(signature, baseMessage)
        } else AppStore.input = generateInput(signature, baseMessage)

        if (!AppStore.input) return
        AppStore.commitment = await getCommitmentFromSignature(
          signature,
          baseMessage
        )

        if (
          AppStore.commitment &&
          (await isCommitmentRegistered(
            AppStore.commitment,
            new Web3Provider(publicClient.transport)
          ))
        ) {
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
    [address, publicClient]
  )
  const reSignMessage = async () =>
    signer && (await startCheckingAddress(signer))

  useEffect(() => {
    if (!AppStore.input && signer) void startCheckingAddress(signer)
  }, [signer, startCheckingAddress])

  const { subTitle, title } = SigningStates[flowState]

  return error ? (
    <StatusBlock
      error
      content={<SignError onClick={reSignMessage} />}
      subtitle={errorList[error]}
    />
  ) : (
    <StatusBlock loadingText={title} subtitle={subTitle} />
  )
}
