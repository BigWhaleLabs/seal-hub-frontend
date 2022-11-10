import { proxy } from 'valtio'
import getUserCount from 'helpers/getUserCount'

class AppStore {
  userCount = getUserCount()
  flowSucceeded = false
  flowInit = false
}

export default proxy(new AppStore())
