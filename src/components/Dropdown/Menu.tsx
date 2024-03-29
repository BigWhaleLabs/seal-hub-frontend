import DropdownOption from 'models/DropdownOption'
import ItemContainer from 'components/Dropdown/ItemContainer'
import classnames, {
  backgroundColor,
  borderRadius,
  cursor,
  inset,
  margin,
  opacity,
  padding,
  position,
  textAlign,
  transitionProperty,
  visibility,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'

const container = (
  closed: boolean,
  fitToItemSize?: boolean,
  extraSpacing?: boolean
) =>
  classnames(
    position('absolute'),
    inset(
      { 'top-7': !extraSpacing },
      { 'right-0': true, 'xs:left-0': true, 'xs:right-auto': true }
    ),
    margin({ 'mt-2.5': extraSpacing }),
    opacity({ 'opacity-0': closed }),
    visibility({ invisible: closed }),
    zIndex('z-40'),
    transitionProperty('transition-all'),
    width({ 'w-full-105': !fitToItemSize })
  )
const menuItem = (selected?: boolean, fitToItemSize?: boolean) =>
  classnames(
    padding('p-2'),
    cursor('cursor-pointer'),
    borderRadius('rounded-md'),
    wordBreak('break-all'),
    backgroundColor('hover:bg-primary-background', {
      'bg-primary-dimmed': selected,
    }),
    width('w-full'),
    textAlign('text-left'),
    opacity('disabled:opacity-30'),
    transitionProperty('transition-colors'),
    width({ 'w-full': fitToItemSize })
  )

export default function ({
  extraSpacing,
  fitToItemSize,
  onSelect,
  open,
  options,
  selected,
}: {
  open: boolean
  options: DropdownOption[]
  onSelect: (option: DropdownOption) => void
  fitToItemSize?: boolean
  selected?: string
  extraSpacing?: boolean
}) {
  return (
    <div className={container(!open, fitToItemSize, extraSpacing)}>
      <ItemContainer>
        {options.map((option) => (
          <button
            disabled={option.disabled}
            key={option.label}
            className={menuItem(
              option.value === selected || option.label === selected,
              fitToItemSize
            )}
            onClick={() => {
              onSelect(option)
            }}
          >
            {option.label}
          </button>
        ))}
      </ItemContainer>
    </div>
  )
}
