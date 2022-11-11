import { BodyText, LinkText, StatusText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Checkmark from 'icons/Checkmark'
import SavedDataStore from 'stores/persistence/SavedDataStore'
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
  const { txHash } = useSnapshot(SavedDataStore)

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
          {txHash && (
            <>
              Here’s a link to your{' '}
              <LinkText url={getEtherscanTxUrl(txHash)}>
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
