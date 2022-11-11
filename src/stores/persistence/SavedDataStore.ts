import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'

class SavedData extends PersistableStore {
  txHash?: string
}

export default proxy(new SavedData().makePersistent())
