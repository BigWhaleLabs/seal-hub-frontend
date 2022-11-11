import { proxy } from 'valtio'

class AppStore {
  connected = false
  flowSucceeded = false
  flowInit = false
}

export default proxy(new AppStore())
