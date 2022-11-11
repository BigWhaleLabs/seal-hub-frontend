import '@rainbow-me/rainbowkit/styles.css'
import { Redirect, Route, Router, Switch } from 'wouter'
import Footer from 'components/Footer'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import NotFound from 'pages/NotFound'
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
          <Switch>
            <Route path="/" component={Main} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/404" component={NotFound} />
            <Route path="">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </Router>
      </Root>
      <Footer />
    </RainbowWrapper>
  )
}
