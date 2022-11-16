import CentralizedProver from 'components/BeforeGeneration/CentralizedProver'
import DecentralizedProver from 'components/BeforeGeneration/DecentralizedProver'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'
import isMobileDevice from 'helpers/isMobile'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-8')
)

export default function () {
  return (
    <div className={container}>
      {isMobileDevice() ? <CentralizedProver /> : <DecentralizedProver />}
    </div>
  )
}
