import { Context, useDisconnect, useSignMessage } from 'wagmi'
import { useEffect } from 'preact/hooks'
import ConsumerType from 'types/consumerType'
import StatusBlock from 'components/StatusBlock'

export default function () {
  const { isLoading, isSuccess, signMessage } = useSignMessage({
    message: 'Sign for SealHub',
    onError() {
      disconnect()
    },
  })
  const { disconnect } = useDisconnect()

  return (
    <Context.Consumer>
      {({ connected }: ConsumerType) => {
        if (!connected) return null

        useEffect(() => {
          signMessage()
        }, [])

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
      }}
    </Context.Consumer>
  )
}
