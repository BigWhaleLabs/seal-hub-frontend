import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Phase } from 'models/FlowPhase'
import AppStore from 'stores/AppStore'
import Button from 'components/Common/Button'
import Spinner from 'icons/Spinner'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  width,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  flexWrap('flex-wrap'),
  alignItems('items-center'),
  gap('gap-y-4'),
  width('w-full')
)

export default function () {
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, openConnectModal }) => {
        if (!mounted) return <Spinner />
        const connected = mounted && account && chain
        AppStore.connected = !!connected
        AppStore.phase = connected ? Phase.check : Phase.init

        return (
          <div className={container}>
            {!connected && (
              <Button onClick={openConnectModal}>Connect wallet</Button>
            )}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
