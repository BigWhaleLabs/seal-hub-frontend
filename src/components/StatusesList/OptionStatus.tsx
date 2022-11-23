import Option from 'components/StatusesList/Option'
import SigningStates, { States } from 'models/SigningStates'

export default function ({
  state,
  isCompleted,
  isLoading,
  isError,
}: {
  state: States
  isCompleted?: boolean
  isLoading?: boolean
  isError?: boolean
}) {
  const { beforeStart, loadingText, completedText } = SigningStates[state]
  let text = beforeStart
  if (isLoading) text = loadingText
  if (isCompleted) text = completedText

  return (
    <Option complete={isCompleted} error={isError} loading={isLoading}>
      {text}
    </Option>
  )
}
