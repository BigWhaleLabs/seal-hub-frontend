import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import CharInCircle from 'components/CharInCircle'
import Tooltip from 'components/Tooltip'

const TooltipHint = ({
  bottomEnd = false,
  text,
}: {
  bottomEnd?: boolean
  text: string
}) => {
  const position = bottomEnd ? 'bottom-end' : 'bottom'

  return (
    <Tooltip fitContainer position={position} text={text}>
      <span>
        <CharInCircle char="?" />
      </span>
    </Tooltip>
  )
}

export default function ({ text }: { text: string }) {
  return (
    <>
      <div className={displayFrom('sm')}>
        <TooltipHint bottomEnd text={text} />
      </div>
      <div className={displayTo('sm')}>
        <TooltipHint text={text} />
      </div>
    </>
  )
}
