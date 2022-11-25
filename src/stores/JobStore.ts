import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import startGeneration from 'helpers/proofs/startGeneration'

export class JobStore extends PersistableStore {
  jobId?: string
  proverAddress?: string
  queuePosition?: number

  checkJob() {
    if (this.jobId && this.proverAddress) {
      void startGeneration({
        proverAddress: this.proverAddress,
        generationWay: 'centralizedReloaded',
      })
    }
  }

  cleanData() {
    this.jobId = this.proverAddress = undefined
  }
}

export default proxy(new JobStore()).makePersistent()
