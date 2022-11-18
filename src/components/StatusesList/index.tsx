import { STATES } from 'types/SigningStates'
import { StatusText } from 'components/Text'
import AppStore from 'stores/AppStore'
import Button from 'components/Button'
import ChildrenProp from 'models/ChildrenProp'
import Delimiter from 'components/Delimiter'
import JobStore from 'stores/JobStore'
import StatusCard from 'components/StatusCard'
import classnames, { display, gap } from 'classnames/tailwind'
import generateCommitment from 'helpers/generateCommitment'
import startGeneration from 'helpers/proofs/startGeneration'

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
          <Button
            small
            onClick={async () => {
              if (
                AppStore.flowState === STATES.GENERATE_COMMITMENT &&
                AppStore.proof
              ) {
                await generateCommitment(AppStore.proof)
                return
              }

              await startGeneration({
                generationWay: AppStore.preferredProofWay,
                proverAddress: JobStore.proverAddress,
              })
            }}
          >
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
