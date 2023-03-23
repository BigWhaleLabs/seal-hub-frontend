import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
  display,
  flexDirection,
  gap,
  padding,
  position,
  width,
  zIndex,
} from 'classnames/tailwind'

interface CardProps {
  accent?: boolean
  bigGap?: boolean
}

const basicCardStyles = ({ accent, bigGap }: CardProps) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    position('relative'),
    gap(bigGap ? 'gap-y-8' : 'gap-y-6'),
    backgroundColor('bg-primary-dark'),
    padding('py-8', 'px-6'),
    borderRadius('rounded-2xl'),
    borderWidth('border'),
    borderColor(accent ? 'border-accent' : 'border-gray-500'),
    boxShadow('shadow-card'),
    boxShadowColor(accent ? 'shadow-accent-semi-transparent' : undefined),
    width('w-full'),
    zIndex('z-20')
  )

export default function ({
  accent,
  bigGap,
  children,
}: ChildrenProp & { accent?: boolean; bigGap?: boolean }) {
  return <div className={basicCardStyles({ accent, bigGap })}>{children}</div>
}
