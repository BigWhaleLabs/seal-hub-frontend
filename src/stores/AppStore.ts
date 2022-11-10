import { proxy } from 'valtio'
import getUserCount from 'helpers/getUserCount'

class AppStore {
  connected = false
  userCount = getUserCount()
  flowSucceeded = false
  flowInit = false
}

export default proxy(new AppStore())
