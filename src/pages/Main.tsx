import { STAGE, stageData } from 'types/flowStage'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import BottomCard from 'components/BottomCard'
import GettingStartedBlock from 'components/GettingStartedBlock'
import SigningFlow from 'components/SigningFlow'
import SuccessCardBlock from 'components/SuccessCard/SuccessCardBlock'
import TopCard from 'components/TopCard'
import ZKFloof from 'components/ZKFloof'
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

function getContent(state: STAGE) {
  switch (state) {
    case STAGE.INIT:
      return <GettingStartedBlock />
    case STAGE.CHECK:
      return <SigningFlow />
    case STAGE.READY:
      return <ZKFloof />
    case STAGE.GENERATE:
      return <ZKFloof />
    case STAGE.SUCCESS:
      return <SuccessCardBlock />
    default:
      return <GettingStartedBlock />
  }
}

function CardBlock({ state = STAGE.INIT }: { state?: STAGE }) {
  const { label, title, subtitle } = stageData[state]
  const content = getContent(state)

  return (
    <TopCard
      label={label}
      title={title}
      subtitle={
        typeof subtitle === 'string' ? subtitle : subtitle && subtitle()
      }
      statusOrContent={content}
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
