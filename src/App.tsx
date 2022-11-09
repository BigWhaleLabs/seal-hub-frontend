import '@rainbow-me/rainbowkit/styles.css'
import { Route, Router } from 'wouter'
import Footer from 'components/Footer'
import MainBlock from 'components/MainBlock'
import Navbar from 'components/Navbar'
import Privacy from 'pages/Privacy'
import RainbowWrapper from 'components/RainbowWrapper'
import Root from 'components/Root'
import Terms from 'pages/Terms'

export default function () {
  return (
    <RainbowWrapper>
      <Navbar />
      <Root>
        <Router>
          <Route path="/" component={MainBlock} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
        </Router>
      </Root>
      <Footer />
    </RainbowWrapper>
  )
}
