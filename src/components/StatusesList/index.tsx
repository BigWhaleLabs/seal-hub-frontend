import { StatusText } from 'components/Common/Text'
import AppStore from 'stores/AppStore'
import Button from 'components/Common/Button'
import ChildrenProp from 'models/ChildrenProp'
import Delimiter from 'components/Common/Delimiter'
import StatusCard from 'components/Common/StatusCard'
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
      {!!statusDescription && (
        <>
          <Delimiter horizontal />
          <StatusText center>{statusDescription}</StatusText>
        </>
      )}
      {hasError && (
        <div className={buttonsWrapper}>
          <Button small onClick={continueFlowOnError}>
            Try again
          </Button>
          <Button
            outlined
            small
            onClick={() => {
              AppStore.resetOnDisconnect()
            }}
          >
            Start over
          </Button>
        </div>
      )}
    </StatusCard>
  )
}
