import { ErrorType, errorList } from 'types/ErrorType'
import { Phase } from 'types/flowPhase'
import { Signer } from 'ethers'
import { generateInput } from 'helpers/createProof'
import { useAccount, useSigner } from 'wagmi'
import { useCallback, useEffect } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Button from 'components/Button'
import ErrorBlock from 'components/ErrorBlock'
import SigningStates, { STATES } from 'types/SigningStates'
import StatusBlock from 'components/StatusBlock'
import classnames, { display, justifyContent } from 'classnames/tailwind'
import getCommitment from 'helpers/getCommitment'
import hasCommitment from 'helpers/hasCommitment'
import signMessage from 'helpers/signMessage'

const errorButtonWrapper = classnames(
  display('flex'),
  justifyContent('justify-center')
)

export default function () {
  const { address } = useAccount()
  const { data: signer } = useSigner({
    onError() {
      console.warn('ERROR')
    },
  })
  const { flowState, error } = useSnapshot(AppStore)
  const startCheckingAddress = useCallback(
    async (signer?: Signer) => {
      if (!address || !signer) {
        AppStore.error = ErrorType.CONNECTION
        return
      }
      AppStore.error = undefined
      AppStore.phase = Phase.CHECK

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
          AppStore.phase = Phase.SUCCESS
          return
        }

        AppStore.flowState = STATES.READY_FOR_GENERATING_PROOF
        AppStore.phase = Phase.READY
      } catch (e) {
        AppStore.error = ErrorType.SIGNATURE
        console.error(e)
      }
    },
    [address]
  )

  useEffect(() => {
    if (!AppStore.input && signer) void startCheckingAddress(signer)
  }, [signer, startCheckingAddress])

  const { title, subTitle } = SigningStates[flowState]

  return (
    <>
      {error ? (
        <ErrorBlock
          colored
          subtitle={errorList[error]}
          content={
            <div className={errorButtonWrapper}>
              {error === ErrorType.SIGNATURE && (
                <Button
                  onClick={async () =>
                    signer && (await startCheckingAddress(signer))
                  }
                >
                  Sign again
                </Button>
              )}
            </div>
          }
        />
      ) : (
        <StatusBlock loadingText={title} subtitle={subTitle} />
      )}
    </>
  )
}
