import { Context } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import Button from 'components/Button'
import ConsumerType from 'types/consumerType'
import SigningFlow from 'components/SigningFlow'
import classnames, {
  alignItems,
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

export default function () {
  const { openConnectModal } = useConnectModal()

  return (
    <Context.Consumer>
      {({ connected }: ConsumerType) => (
        <div className={container}>
          {connected ? (
            <SigningFlow />
          ) : (
            <Button onClick={openConnectModal}>Connect wallet</Button>
          )}
        </div>
      )}
    </Context.Consumer>
  )
}
