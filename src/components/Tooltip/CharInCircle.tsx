import classnames, {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  boxSizing,
  cursor,
  display,
  fontFamily,
  fontSize,
  height,
  justifyContent,
  width,
} from 'classnames/tailwind'

const questionStyles = (disabled?: boolean) =>
  classnames(
    display('flex'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    fontSize('text-xs'),
    fontFamily('font-primary'),
    cursor({ 'cursor-pointer': !disabled })
  )

const borderWrapper = classnames(
  boxSizing('box-content'),
  borderRadius('rounded-full'),
  borderWidth('border'),
  borderColor('border-current'),
  width('w-4'),
  height('h-4'),
  display('flex'),
  justifyContent('justify-center')
)

export default function ({
  disabled,
  char,
}: {
  disabled?: boolean
  char: string
}) {
  return (
    <div className={borderWrapper}>
      <div className={questionStyles(disabled)}>{char}</div>
    </div>
  )
}
