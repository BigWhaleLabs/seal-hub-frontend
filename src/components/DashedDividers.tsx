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
const divider = classnames(
  borderColor('border-accent'),
  borderWidth('border-t'),
  borderStyle('border-dashed')
)

export default function () {
  return (
    <div className={wrapper}>
      <div className={divider} />
      <div className={divider} />
    </div>
  )
}
