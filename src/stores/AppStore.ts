import { proxy } from 'valtio'
import getUserCount from 'helpers/getUserCount'

class AppStore {
  userCount = getUserCount()
  flowSucceeded = false
}

export default proxy(new AppStore())
