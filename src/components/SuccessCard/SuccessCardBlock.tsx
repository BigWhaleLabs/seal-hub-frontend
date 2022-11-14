import { BodyText, LinkText, StatusText } from 'components/Text'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Checkmark from 'icons/Checkmark'
import SealStar from 'icons/SealStar'
import StatusBlock from 'components/StatusBlock'
import classnames, { alignItems, display, gap } from 'classnames/tailwind'
import getEtherscanTxUrl from 'helpers/getEtherscanTxUrl'

const successText = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-2')
)

export default function () {
  const { commitmentTxHas } = useSnapshot(AppStore)

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
          You’re verified.
          {commitmentTxHas && (
            <>
              Here’s a link to your{' '}
              <LinkText url={getEtherscanTxUrl(commitmentTxHas)}>
                commitment on etherscan
              </LinkText>
              .
            </>
          )}
        </BodyText>
      </>
    )
  }

  return <StatusBlock loadingText="" subtitle={<StatusBlockSubtitle />} />
}
