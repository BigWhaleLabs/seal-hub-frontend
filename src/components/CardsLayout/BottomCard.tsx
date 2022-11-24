import {
  BodyText,
  GradientText,
  HeaderText,
  LinkText,
} from 'components/UI/Text'
import Card from 'components/UI/Card'
import SealStar from 'icons/SealStar'
import classnames, {
  borderColor,
  display,
  flexDirection,
  gap,
  listStyleType,
  margin,
  space,
  width,
} from 'classnames/tailwind'

const topBlock = classnames(display('flex'), gap('gap-x-4'))
const topBlockInfo = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-2')
)
const listStyles = classnames(
  listStyleType('list-disc'),
  margin('mt-6', 'ml-6')
)

export default function () {
  return (
    <Card>
      <div className={topBlock}>
        <div className={width('w-14')}>
          <SealStar small />
        </div>
        <div className={topBlockInfo}>
          <HeaderText>The deets</HeaderText>
          <BodyText>
            If this is your first time verifying through SealHub, you’ll need to
            create a ‘commitment’ on the blockchain. Basically, this means:
            <ul className={listStyles}>
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
              <li>
                <LinkText url="https://blog.bigwhalelabs.com/">
                  Read more about it here
                </LinkText>
              </li>
            </ul>
          </BodyText>
        </div>
      </div>
      <hr className={borderColor('border-gray-700')} />
      <div className={space('space-y-2')}>
        <GradientText>In laymen’s terms:</GradientText>
        <BodyText>
          We use a fancy shmancy process to verify your identity while
          protecting your anonymity with Zero Knowledge Proof.{' '}
        </BodyText>
      </div>
    </Card>
  )
}
