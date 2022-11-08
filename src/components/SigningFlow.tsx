import { useDisconnect, useSignMessage } from 'wagmi'
import { useEffect } from 'preact/hooks'
import StatusBlock from 'components/StatusBlock'

export default function () {
  const { disconnect } = useDisconnect()
  const { isLoading, isSuccess, signMessage } = useSignMessage({
    message: 'Sign a message to connect to SealHub',
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

  useEffect(signMessage, [signMessage])

  return (
    <>
      {(isLoading || isSuccess) && (
        <StatusBlock loadingText={loadingText} subtitle={subTitle} />
      )}
    </>
  )
}
