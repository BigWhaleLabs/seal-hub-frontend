import {
  animation,
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
import TopCard from 'components/CardsLayout/TopCard'
import classNamesToString from 'helpers/classNamesToString'

const big404 = classNamesToString(
  position('absolute'),
  fontSize('text-13.5xl'),
  textColor('text-transparent'),
  fontWeight('font-bold'),
  fontFamily('font-primary'),
  inset('top-1/6'),
  rotate('-rotate-90'),
  animation('animate-appear-404'),
  display('hidden', 'lg:block'),
  zIndex('z-10'),
  'accent-text-stroke'
)

export default function () {
  return (
    <>
      <TopCard statusOrContent={<BottomBlock />} subtitle={<TopBlock />} />
      <span className={big404}>404</span>
    </>
  )
}
