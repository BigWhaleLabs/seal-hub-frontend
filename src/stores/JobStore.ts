import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'

export class JobStore extends PersistableStore {
  jobId?: string
}

export default proxy(new JobStore()).makePersistent()
