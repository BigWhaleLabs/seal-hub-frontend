import { Suspense, memo } from 'react'
import { display } from 'classnames/tailwind'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useEnsName } from 'wagmi'

interface ENSAddressProps {
  address: string
  eNSName?: string
}

function ENSAddressSuspended({
  address,
  truncate,
  truncateSize,
}: ENSAddressProps & {
  truncate?: boolean
  truncateSize: number
}) {
  const { data: eNSName } = useEnsName({ address: address as `0x${string}` })

  return (
    <>
      {truncate
        ? truncateMiddleIfNeeded(eNSName || address, truncateSize)
        : eNSName || truncateMiddleIfNeeded(address, truncateSize)}
    </>
  )
}

function ENSAddress({
  address,
  truncateSize,
}: ENSAddressProps & { truncateSize: number }) {
  return (
    <Suspense fallback={truncateMiddleIfNeeded(address, truncateSize)}>
      <ENSAddressSuspended
        truncate
        address={address}
        truncateSize={truncateSize}
      />
    </Suspense>
  )
}

export default memo<ENSAddressProps & { truncateSize?: number }>(
  ({ address, truncateSize }) => {
    // Used for gradient link. It won't work if we wrap it with a span
    if (truncateSize)
      return <ENSAddress address={address} truncateSize={truncateSize} />

    return (
      <>
        <span className={displayTo('md')}>
          <ENSAddress address={address} truncateSize={11} />
        </span>
        <span className={display(displayFrom('md'), 'lg:hidden')}>
          <ENSAddress address={address} truncateSize={17} />
        </span>
        <span className={displayFrom('lg')}>
          <ENSAddress address={address} truncateSize={25} />
        </span>
      </>
    )
  }
)
