import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useAccount } from 'wagmi'
import ConnectedButton from 'components/Navbar/ConnectedButton'
import Delimiter from 'components/Delimiter'
import Logo from 'components/Navbar/Logo'
import SealVerse from 'components/Navbar/SealVerse'
import SocialLinks from 'components/Navbar/SocialLinks'
import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  gap,
  lineHeight,
  space,
  textAlign,
  width,
} from 'classnames/tailwind'

const walletAccount = classnames(
  textAlign('text-right'),
  lineHeight('leading-5')
)

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col-reverse', 'xs:flex-row'),
  alignItems('items-center'),
  gap('gap-x-3', 'sm:gap-x-4'),
  cursor('cursor-pointer'),
  displayFrom('xs')
)
const accountLinkContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('xs:space-x-4', 'space-x-2'),
  cursor('cursor-pointer')
)

const AccountAndLogo = () => {
  const { address: account } = useAccount()

  return (
    <>
      <div className={walletAccount}>
        <ConnectedButton />
      </div>
      <div className={width('w-fit')}>
        <Logo connected={!!account} />
      </div>
    </>
  )
}

export default function () {
  return (
    <>
      <div className={walletContainer}>
        <SocialLinks />
        <SealVerse />
        <div className={displayFrom('xs')}>
          <Delimiter />
        </div>
        <div className={accountLinkContainer}>
          <AccountAndLogo />
        </div>
      </div>

      <div className={displayTo('xs')}>
        <div className={accountLinkContainer}>
          <AccountAndLogo />
        </div>
      </div>
      <div className={displayTo('xs')}>
        <SealVerse />
      </div>
    </>
  )
}
