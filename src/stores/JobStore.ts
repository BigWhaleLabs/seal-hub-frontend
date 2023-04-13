import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import startGeneration from 'helpers/proofs/startGeneration'

export class JobStore extends PersistableStore {
  showCookie = true
  jobId?: string
  proverAddress?: string
  queuePosition?: number

  checkJob() {
    if (this.jobId && this.proverAddress) {
      void startGeneration({
        generationWay: 'centralizedReloaded',
        proverAddress: this.proverAddress,
      })
    }
  }

  cleanData() {
    this.jobId = this.proverAddress = undefined
  }
}

export default proxy(new JobStore()).makePersistent()
