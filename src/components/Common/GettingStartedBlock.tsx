import { BodyText } from 'components/Common/Text'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import ConnectWalletButton from 'components/Common/ConnectWalletButton'
import Highlighter from 'components/Highlighter'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6'),
  alignItems('items-center')
)

export default function () {
  const { connected } = useSnapshot(AppStore)

  return (
    <div className={wrapper}>
      {!connected && (
        <>
          <Highlighter textCenter text="Getting Started" />
          <BodyText centered>
            Connect a wallet to generate a commitment and add on chain.
          </BodyText>
        </>
      )}
      <ConnectWalletButton />
    </div>
  )
}
