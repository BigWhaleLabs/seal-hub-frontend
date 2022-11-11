import { BodyText, StatusText } from 'components/Text'
import Checkmark from 'icons/Checkmark'
import SealStar from 'icons/SealStar'
import StatusBlock from 'components/StatusBlock'
import classnames, { alignItems, display, gap } from 'classnames/tailwind'

const successText = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-2')
)

export default function () {
  const StatusBlockSubtitle = () => {
    return (
      <>
        <SealStar />
        <StatusText color="success" centered>
          <span className={successText}>
            Success!
            <Checkmark />
          </span>
        </StatusText>
        <BodyText centered small>
          You're verified
        </BodyText>
      </>
    )
  }

  return <StatusBlock loadingText="" subtitle={<StatusBlockSubtitle />} />
}
