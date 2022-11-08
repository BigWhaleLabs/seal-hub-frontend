import { useAccount, useDisconnect, useSignMessage } from 'wagmi'
import { useEffect } from 'preact/hooks'
import StatusBlock from 'components/StatusBlock'
import createMessage from 'helpers/createMessage'
import createProof from 'helpers/createProof'

export default function () {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const message = `SealHub verification for ${address}`
  const { isLoading, isSuccess, signMessage } = useSignMessage({
    onSuccess(signature) {
      void createProof(signature, message)
    },
    onError() {
      disconnect()
    },
  })

  const loadingText = isLoading
    ? 'Waiting for signature'
    : 'Checking for existing commitment...'

  const subTitle = isLoading
    ? 'We’re requesting your signature to generate your commitment.'
    : 'Hang tight!'

  useEffect(() => {
    async function start() {
      const messageHash = await createMessage(message)
      signMessage(messageHash)
    }

    if (address) void start()
  }, [address, message, signMessage])

  return (
    <>
      {(isLoading || isSuccess) && (
        <StatusBlock loadingText={loadingText} subtitle={subTitle} />
      )}
    </>
  )
}
