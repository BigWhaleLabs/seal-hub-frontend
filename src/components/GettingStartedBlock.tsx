import { BodyText } from 'components/Text'
import ConnectWalletButton from 'components/ConnectWalletButton'
import FocusedText from 'components/FocusedText'
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
  return (
    <div className={wrapper}>
      <FocusedText text="Getting Started" />
      <BodyText centered>
        Connect a wallet to generate a commitment and add on chain.
      </BodyText>
      <ConnectWalletButton />
    </div>
  )
}
