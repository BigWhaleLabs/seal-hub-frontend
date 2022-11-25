import { Phase } from 'models/FlowPhase'
import { useAccount } from 'wagmi'
import { useEffect } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import BottomCard from 'components/CardsLayout/BottomCard'
import PhaseData from 'data/phaseData'
import TopCard from 'components/CardsLayout/TopCard'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  gap('gap-y-8')
)

export default function () {
  const { phase = Phase.init } = useSnapshot(AppStore)
  const { label, title, subtitle, content } = PhaseData[phase]
  const { connector: activeConnector } = useAccount()

  useEffect(() => {
    if (activeConnector) {
      activeConnector.on('change', () => AppStore.resetOnDisconnect())
      activeConnector.on('disconnect', () => AppStore.resetOnDisconnect())
    }
  }, [activeConnector])

  return (
    <div className={container}>
      <TopCard
        label={label}
        title={title}
        subtitle={subtitle}
        statusOrContent={content}
      />
      {phase !== Phase.success && <BottomCard />}
    </div>
  )
}
