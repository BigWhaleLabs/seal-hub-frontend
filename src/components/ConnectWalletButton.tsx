import { Context, useSignMessage } from 'wagmi'
import { GradientText, StatusText } from 'components/Text'
import { parseError } from '@big-whale-labs/frontend-utils'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import Button from 'components/Button'
import Spinner from 'icons/Spinner'
import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  flexWrap,
  gap,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  flexWrap('flex-wrap'),
  alignItems('items-center'),
  gap('gap-y-4')
)
const blocksContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  flexWrap('flex-wrap'),
  alignItems('items-center'),
  gap('gap-2')
)

export default function () {
  const { openConnectModal } = useConnectModal()
  const { error, isError, isLoading, isSuccess, signMessage } = useSignMessage()
  const showButton = !isLoading && !isSuccess

  return (
    <Context.Consumer>
      {({
        address,
        connected,
        name,
      }: {
        address?: string
        connected: boolean
        name: string
        chainId: number
        isLoading: boolean
      }) => (
        <div className={container}>
          {!connected && (
            <Button onClick={openConnectModal}>Connect wallet</Button>
          )}
          {connected && (
            <div className={blocksContainer}>
              <StatusText color="success">{name || address}</StatusText>
            </div>
          )}
          {connected && showButton && (
            <div
              className={cursor('cursor-pointer')}
              onClick={() => {
                signMessage({ message: 'Sign for SealHub' })
              }}
            >
              <GradientText>Sign message</GradientText>
            </div>
          )}
          <StatusText color={isError ? 'error' : 'success'}>
            {isLoading && <Spinner />}
            {isError && parseError(error)}
            {isSuccess && 'Signed successfully'}
          </StatusText>
        </div>
      )}
    </Context.Consumer>
  )
}
