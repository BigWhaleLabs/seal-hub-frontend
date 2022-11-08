import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  borderColor,
  borderStyle,
  borderWidth,
  display,
  flexDirection,
  gap,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-3')
)
const divider = classNamesToString(
  borderColor('border-accent'),
  borderWidth('border-t'),
  borderStyle('border-dashed')
)

export default function () {
  return (
    <div className={wrapper}>
      <div className={classNamesToString('mask-border-fade-1')}>
        <div className={divider} />
      </div>
      <div className={classNamesToString('mask-border-fade-2')}>
        <div className={divider} />
      </div>
    </div>
  )
}
