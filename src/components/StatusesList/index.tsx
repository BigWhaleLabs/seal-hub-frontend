import { StatusText } from 'components/Text'
import ChildrenProp from 'models/ChildrenProp'
import Delimiter from 'components/Delimiter'
import StatusCard from 'components/StatusCard'

export default function ({
  statusDescription,
  children,
}: ChildrenProp & {
  statusDescription?: string
}) {
  return (
    <StatusCard>
      {children}
      {statusDescription ? (
        <>
          <Delimiter horizontal />
          <StatusText>{statusDescription}</StatusText>
        </>
      ) : undefined}
    </StatusCard>
  )
}
