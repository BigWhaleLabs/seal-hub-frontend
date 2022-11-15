import { Phase } from 'types/flowPhase'
import { useAccount } from 'wagmi'
import { useEffect } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import BottomCard from 'components/BottomCard'
import TopCard from 'components/TopCard'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
} from 'classnames/tailwind'
import renderStageData from 'helpers/renderStageData'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  gap('gap-y-8')
)

export default function () {
  const { phase = Phase.INIT } = useSnapshot(AppStore)
  const { label, title, subtitle, content } = renderStageData[phase]
  const { connector: activeConnector } = useAccount()

  useEffect(() => {
    if (activeConnector) {
      activeConnector.on('change', () => AppStore.resetOnDisconnect())
    }
  }, [activeConnector])

  return (
    <div className={container}>
      <TopCard
        label={label}
        title={title}
        subtitle={typeof subtitle === 'string' ? subtitle : subtitle}
        statusOrContent={content}
      />
      {phase !== Phase.SUCCESS && <BottomCard />}
    </div>
  )
}
