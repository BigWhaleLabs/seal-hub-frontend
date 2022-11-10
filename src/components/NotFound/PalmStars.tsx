import RibbedCircles from 'icons/RibbedCircles'
import classnames, { inset, position } from 'classnames/tailwind'

const posy = classnames(
  position('absolute'),
  inset('-right-67px', '-bottom-67px')
)

export default function () {
  return (
    <div className={posy}>
      <RibbedCircles />
    </div>
  )
}
