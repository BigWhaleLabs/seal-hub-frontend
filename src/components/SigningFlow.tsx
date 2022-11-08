import { useDisconnect, useSignMessage } from 'wagmi'
import { useEffect } from 'preact/hooks'
import StatusBlock from 'components/StatusBlock'

export default function () {
  const { isLoading, isSuccess, signMessage } = useSignMessage({
    message: 'Sign a message to connect to SealHub',
    onError() {
      disconnect()
    },
  })
  useEffect(signMessage, [signMessage])

  const { disconnect } = useDisconnect()
  return (
    <>
      {isLoading && (
        <StatusBlock
          completed={isSuccess}
          loadingText={isLoading ? 'Waiting for signature' : ''}
          subtitle="We’re requesting your signature to generate your commitment. "
        />
      )}
      {isSuccess && (
        <StatusBlock
          loadingText="Checking for existing commitment..."
          subtitle="Hang tight!"
        />
      )}
    </>
  )
}
