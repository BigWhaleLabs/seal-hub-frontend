import { BodyText, LinkText, StatusText } from 'components/Text'
import Checkmark from 'icons/Checkmark'
import Spinner from 'icons/Spinner'
import StatusBlock from 'components/StatusBlock'
import classnames, { alignItems, display, gap } from 'classnames/tailwind'

const successText = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-2')
)

export function StatusBlockCard() {
  const StatusBlockSubtitle = () => {
    return (
      <>
        <Spinner />
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

export function Subtitle() {
  return (
    <div>
      You can add another wallet’s commitment.
      <br />
      <LinkText onClick={() => console.log('disconnect')}>
        Disconnect wallet and add commitment for another wallet
      </LinkText>
    </div>
  )
}
