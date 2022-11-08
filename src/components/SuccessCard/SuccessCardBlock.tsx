import { BodyText, LinkText, StatusText } from 'components/Text'
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
        <StatusText color="success">
          <span className={successText}>
            Success!
            <Checkmark />
          </span>
        </StatusText>

        <BodyText>
          You’re verified. Here’s a link to your{' '}
          <LinkText url="#">commitment on etherscan</LinkText>.
        </BodyText>
      </>
    )
  }

  return <StatusBlock loadingText="" subtitle={<StatusBlockSubtitle />} />
}
