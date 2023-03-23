import { useCallback, useState } from 'preact/hooks'
import AnimatedLogo from 'icons/AnimatedLogo'
import RightBlock from 'components/Navbar/RightBlock'
import SiteLogo from 'components/Navbar/SiteLogo'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  gap,
  inset,
  justifyContent,
  margin,
  padding,
  position,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'
import useOnScroll from 'hooks/useOnScroll'

const navbar = (visible?: boolean, withoutRightBlock?: boolean) =>
  classnames(
    position('sticky'),
    inset('top-0'),
    display('flex'),
    alignItems('items-center'),
    justifyContent(withoutRightBlock ? 'sm:justify-center' : 'justify-between'),
    padding('p-4', 'lg:px-24'),
    gap('gap-x-2', 'lg:gap-x-0'),
    zIndex('z-40'),
    backgroundColor(visible ? 'bg-primary-dark' : 'bg-transparent'),
    transitionProperty('transition-all'),
    margin('mb-8')
  )

export default function ({ hideWalletPart }: { hideWalletPart?: boolean }) {
  const [backgroundVisible, setBackgroundVisible] = useState(false)
  const onScroll = useCallback(() => {
    setBackgroundVisible(window.scrollY > 20)
  }, [])
  useOnScroll(onScroll)

  return (
    <nav className={navbar(backgroundVisible, hideWalletPart)}>
      <SiteLogo alpha logo={<AnimatedLogo />} logoText="SealHub" />
      {!hideWalletPart && <RightBlock />}
    </nav>
  )
}
