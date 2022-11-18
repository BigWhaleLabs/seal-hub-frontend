import { StatusText } from 'components/Text'
import ChildrenProp from 'models/ChildrenProp'
import Delimiter from 'components/Delimiter'
import StatusCard from 'components/StatusCard'

export default function ({
  statusDescription,
  hasError,
  children,
}: ChildrenProp & {
  hasError?: boolean
  statusDescription?: string
}) {
  return (
    <StatusCard>
      {children}
      {statusDescription ? (
        <>
          <Delimiter horizontal />
          <StatusText color={hasError ? 'error' : undefined}>
            {statusDescription}
          </StatusText>
        </>
      ) : undefined}
      {hasError ? 'Restart flow' : undefined}
    </StatusCard>
  )
}
