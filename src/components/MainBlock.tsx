import { GradientText, HeaderText, StatusText } from 'components/Text'
import StatusBlock from 'components/StatusBlock'
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
      <StatusText color="success">
        Checking for existing commitment...
      </StatusText>
      <StatusBlock
        loadingText="Waiting for signature"
        subtitle="We’re requesting your signature to generate your commitment. "
      />
      <StatusBlock
        loadingText="Checking for existing commitment..."
        subtitle="Hang tight!"
      />
    </div>
  )
}
