import { GradientText, HeaderText, StatusText } from 'components/Text'
import ConnectWalletButton from 'components/ConnectWalletButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  space('space-y-2')
)
export default function () {
  return (
    <div className={container}>
      <HeaderText>Verify, and stay anonymous</HeaderText>
      <GradientText>In laymen’s terms:</GradientText>
      <ConnectWalletButton />
      <StatusText color="success">
        Checking for existing commitment...
      </StatusText>
    </div>
  )
}
