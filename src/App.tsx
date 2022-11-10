import '@rainbow-me/rainbowkit/styles.css'
import { Route, Router } from 'wouter'
import Footer from 'components/Footer'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import Privacy from 'pages/Privacy'
import RainbowWrapper from 'components/RainbowWrapper'
import Root from 'components/Root'
import Terms from 'pages/Terms'
import setGlobalDefaults from 'helpers/setGlobalDefaults'
import useHashLocation from 'hooks/useHashLocation'

export default function () {
  setGlobalDefaults()

  return (
    <RainbowWrapper>
      <Navbar />
      <Root>
        <Router hook={useHashLocation}>
          <Route path="/" component={Main} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
        </Router>
      </Root>
      <Footer />
    </RainbowWrapper>
  )
}
