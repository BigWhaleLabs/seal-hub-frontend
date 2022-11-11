import { STAGE, stageData } from 'types/flowStage'
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

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  gap('gap-y-8')
)

function CardBlock({ state = STAGE.INIT }: { state?: STAGE }) {
  const { label, title, subtitle, content } = stageData[state]

  return (
    <TopCard
      label={label}
      title={title}
      subtitle={
        typeof subtitle === 'string' ? subtitle : subtitle && subtitle()
      }
      statusOrContent={content()}
    />
  )
}

export default function () {
  const { stage } = useSnapshot(AppStore)

  return (
    <div className={container}>
      <CardBlock state={stage} />
      <BottomCard />
    </div>
  )
}
