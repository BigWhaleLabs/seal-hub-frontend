import { ErrorType, ThrownError, errorList } from 'types/ErrorType'
import { Phase } from 'types/flowPhase'
import { Signer } from 'ethers'
import { generateInput } from 'helpers/createProof'
import { margin } from 'classnames/tailwind'
import { useAccount, useSigner } from 'wagmi'
import { useCallback, useEffect } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Button from 'components/Button'
import ErrorBlock from 'components/ErrorBlock'
import SigningStates, { STATES } from 'types/SigningStates'
import StatusBlock from 'components/StatusBlock'
import browserIs from 'helpers/browserIs'
import getCommitment from 'helpers/getCommitment'
import hasCommitment from 'helpers/hasCommitment'
import signMessage from 'helpers/signMessage'

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
      if (AppStore.isSignRequested[address]) return

      AppStore.error = undefined
      AppStore.isSignRequested[address] = true
      AppStore.walletFlow[address].phase = Phase.CHECK

      try {
        const { baseMessage, signature } = await signMessage(address, signer)

        AppStore.walletFlow[address].flowState = STATES.CHECK_COMMITMENT

        if (browserIs('firefox')) {
          AppStore.inputs[address] = generateInput(signature, baseMessage)
        } else {
          const { generateInput } = new ComlinkWorker<
            typeof import('../helpers/createProof')
          >(new URL('../helpers/createProof', import.meta.url))
          AppStore.inputs[address] = await generateInput(signature, baseMessage)
        }
        AppStore.commitments[address] = await getCommitment(
          AppStore.inputs[address],
          signature,
          baseMessage
        )

        if (
          AppStore.commitments[address] &&
          (await hasCommitment(AppStore.commitments[address]))
        ) {
          AppStore.walletFlow[address].phase = Phase.SUCCESS
          return
        }

        AppStore.walletFlow[address].flowState =
          STATES.READY_FOR_GENERATING_PROOF
        AppStore.walletFlow[address].phase = Phase.READY
      } catch (e) {
        AppStore.isSignRequested[address] = false
        AppStore.error = (e as unknown as ThrownError).type
        console.error(e)
      }
    },
    [address]
  )
  const reSignMessage = async () =>
    signer && (await startCheckingAddress(signer))

  useEffect(() => {
    if (
      !AppStore.isSignRequested[address as string] &&
      !AppStore.input &&
      signer
    )
      void startCheckingAddress(signer)
  }, [address, signer, startCheckingAddress])

  const { title, subTitle } = SigningStates[flowState]

  return error === ErrorType.SIGNATURE ? (
    <ErrorBlock
      subtitle={errorList[error]}
      content={<SignError onClick={reSignMessage} />}
    />
  ) : (
    <StatusBlock loadingText={title} subtitle={subTitle} />
  )
}
