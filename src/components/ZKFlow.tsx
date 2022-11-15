import { Phase } from 'types/flowPhase'
import { STATES } from 'types/SigningStates'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Option from 'components/StatusesList/Option'
import StatusesList from 'components/StatusesList'

export default function () {
  const { flowState, zkDownloadProgress, wasmDownloadProgress } =
    useSnapshot(AppStore)

  const progress = ((zkDownloadProgress + wasmDownloadProgress) * 100) / 2

  const statusDescription =
    flowState === STATES.GENERATE_PROOF
      ? 'Hang tight, this whole process may take 5-20 minutes.'
      : flowState === STATES.GENERATE_COMMITMENT
      ? 'Almost there'
      : 'Ready to begin...'

  return (
    <StatusesList statusDescription={statusDescription}>
      <Option
        complete={!!AppStore.commitment}
        loading={flowState === STATES.CHECK_COMMITMENT}
      >
        Commitment generated
      </Option>
      <Option
        complete={progress === 100 && !!AppStore.proof}
        loading={flowState === STATES.GENERATE_PROOF}
      >
        {progress !== 100 ? (
          <>
            Download files (
            {zkDownloadProgress > 0 ? (zkDownloadProgress > 50 ? 2 : 1) : 0}/2){' '}
            {progress.toFixed(0)}%
          </>
        ) : (
          'Generate zero knowledge proof'
        )}
      </Option>
      <Option
        complete={AppStore.phase === Phase.SUCCESS}
        loading={flowState === STATES.GENERATE_COMMITMENT}
      >
        Add to chain
      </Option>
    </StatusesList>
  )
}
