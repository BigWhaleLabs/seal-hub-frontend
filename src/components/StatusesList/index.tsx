import { StatusText } from 'components/Text'
import AppStore from 'stores/AppStore'
import Button from 'components/Button'
import ChildrenProp from 'models/ChildrenProp'
import Delimiter from 'components/Delimiter'
import JobStore from 'stores/JobStore'
import StatusCard from 'components/StatusCard'
import classnames, { display, gap } from 'classnames/tailwind'
import continueFlowOnError from 'helpers/proofs/continueFlowOnError'

const buttonsWrapper = classnames(display('flex'), gap('gap-x-4'))

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
          <StatusText>{statusDescription}</StatusText>
        </>
      ) : undefined}
      {hasError ? (
        <div className={buttonsWrapper}>
          <Button small onClick={continueFlowOnError}>
            Try again
          </Button>
          <Button
            outlined
            small
            onClick={() => {
              AppStore.resetOnDisconnect()
              JobStore.cleanData()
            }}
          >
            Start over
          </Button>
        </div>
      ) : undefined}
    </StatusCard>
  )
}
