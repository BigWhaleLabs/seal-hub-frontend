import '@rainbow-me/rainbowkit/styles.css'
import { Redirect, Route, Router, Switch } from 'wouter'
import Footer from 'components/Common/Footer'
import JobStore from 'stores/JobStore'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import NotFound from 'pages/NotFound'
import Privacy from 'pages/Privacy'
import RainbowWrapper from 'components/RainbowWrapper'
import Root from 'components/Root'
import Terms from 'pages/Terms'
import classnames, {
  display,
  flexDirection,
  minHeight,
} from 'classnames/tailwind'
import useHashLocation from 'hooks/useHashLocation'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  minHeight('min-h-screen')
)

export default function () {
  JobStore.checkJob()

  return (
    <RainbowWrapper>
      <div className={wrapper}>
        <Navbar />
        <Root>
          <Router hook={useHashLocation}>
            <Switch>
              <Route component={Main} path="/" />
              <Route component={Terms} path="/terms" />
              <Route component={Privacy} path="/privacy" />
              <Route component={NotFound} path="/404" />
              <Route path="">
                <Redirect to="/404" />
              </Route>
            </Switch>
          </Router>
        </Root>
        <Footer />
      </div>
    </RainbowWrapper>
  )
}
