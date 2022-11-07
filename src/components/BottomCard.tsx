import { BodyText, GradientText, HeaderText } from 'components/Text'
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  gap,
  height,
  padding,
  width,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6'),
  backgroundColor('bg-gray-900'),
  padding('py-8', 'px-6'),
  borderRadius('rounded-2xl'),
  borderWidth('border'),
  borderColor('border-gray-500')
)
const topBlock = classnames(display('flex'), gap('gap-x-4'))
const topBlockInfo = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-2')
)

export default function () {
  return (
    <div className={wrapper}>
      <div className={topBlock}>
        <div className={classnames(width('w-14'), height('h-14'))} />
        <div className={topBlockInfo}>
          <HeaderText>The deets</HeaderText>
          <BodyText>
            If this is your first time verifying through SealHub, you’ll need to
            create a ‘commitment’ on the blockchain. Basically, this means:
            <ul>
              <li>
                There is a hashed signature proving you own your wallet (your
                commitment).
              </li>
              <li>
                We allow you to use an in-browser generator to produce zero
                knowledge proof from combining your commitment and pairing it
                with a public list your wallet may exist on using merkle trees.
              </li>
              <li>
                With the ZKP you create, you can prove you own a wallet without
                revealing your identity.
              </li>
              <li>Read more about it here</li>
            </ul>
          </BodyText>
        </div>
      </div>
      <hr className={borderColor('border-gray-500')} />
      <GradientText>In laymen’s terms:</GradientText>
      <BodyText>
        We use a fancy shmancy process to verify your identity while protecting
        your anonymity with Zero Knowledge Proof.{' '}
      </BodyText>
    </div>
  )
}
