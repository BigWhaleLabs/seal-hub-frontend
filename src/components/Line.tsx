import classnames, {
  backgroundImage,
  display,
  gradientColorStops,
  height,
  width,
} from 'classnames/tailwind'

const line = (toLeft?: boolean) => {
  return classnames(
    height('h-px'),
    width('w-36'),
    gradientColorStops('from-accent', 'to-primary-dark'),
    backgroundImage(toLeft ? 'bg-gradient-to-l' : 'bg-gradient-to-r'),
    display('hidden', 'md:block')
  )
}

export default ({ toLeft }: { toLeft?: boolean }) => {
  return <div className={line(toLeft)} />
}
