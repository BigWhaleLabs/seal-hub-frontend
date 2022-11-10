import BottomBlock from 'components/NotFound/BottomBlock'
import TopBlock from 'components/NotFound/TopBlock'
import TopCard from 'components/TopCard'

export default function () {
  return <TopCard subtitle={<TopBlock />} statusOrContent={<BottomBlock />} />
}
