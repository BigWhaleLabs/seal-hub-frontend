import {
  display,
  fontFamily,
  fontSize,
  fontWeight,
  inset,
  position,
  rotate,
  textColor,
  zIndex,
} from 'classnames/tailwind'
import BottomBlock from 'components/NotFound/BottomBlock'
import TopBlock from 'components/NotFound/TopBlock'
import TopCard from 'components/TopCard'
import classNamesToString from 'helpers/classNamesToString'

const big404 = classNamesToString(
  position('absolute'),
  rotate('-rotate-90'),
  fontSize('text-13.5xl'),
  textColor('text-transparent'),
  fontWeight('font-bold'),
  fontFamily('font-primary'),
  inset('right-full-70', 'top-1/6'),
  display('hidden', 'lg:block'),
  zIndex('z-10'),
  'accent-text-stroke'
)

export default function () {
  return (
    <>
      <TopCard subtitle={<TopBlock />} statusOrContent={<BottomBlock />} />
      <span className={big404}>404</span>
    </>
  )
}
