import { BodyText, LinkText, StatusText } from 'components/Common/Text'
import { useNetwork } from 'wagmi'
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
  const { commitmentTxHash } = useSnapshot(AppStore)
  const { chain } = useNetwork()

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
          You’re verified.{' '}
          {commitmentTxHash && chain && (
            <>
              Here’s a link to your{' '}
              <LinkText
                url={getEtherscanTxUrl(commitmentTxHash, chain.network)}
              >
                commitment on etherscan
              </LinkText>
              .
            </>
          )}
        </BodyText>
      </>
    )
  }

  return <StatusBlock subtitle={<StatusBlockSubtitle />} />
}
