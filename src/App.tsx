import '@rainbow-me/rainbowkit/styles.css'
import Footer from 'components/Footer'
import MainBlock from 'components/MainBlock'
import Navbar from 'components/Navbar'
import RainbowWrapper from 'components/RainbowWrapper'
import Root from 'components/Root'

export default function () {
  return (
    <RainbowWrapper>
      <Navbar />
      <Root>
        <MainBlock />
      </Root>
      <Footer />
    </RainbowWrapper>
  )
}
