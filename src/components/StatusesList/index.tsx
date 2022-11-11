import { StatusText } from 'components/Text'
import ChildrenProp from 'models/ChildrenProp'
import Delimiter from 'components/Delimiter'
import StatusCard from 'components/StatusCard'

export default function ({
  statusDescription,
  children,
}: ChildrenProp & {
  statusDescription: string
}) {
  return (
    <StatusCard>
      {children}
      <Delimiter horizontal />
      <StatusText>{statusDescription}</StatusText>
    </StatusCard>
  )
}
