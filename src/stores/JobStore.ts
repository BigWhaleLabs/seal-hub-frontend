import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import startGeneration from 'helpers/proofs/startGeneration'

export class JobStore extends PersistableStore {
  jobId?: string
  proverAddress?: string

  checkJob() {
    if (this.jobId && this.proverAddress)
      void startGeneration({
        proverAddress: this.proverAddress,
        generationWay: 'centralizedReloaded',
      })
  }

  cleanData() {
    this.jobId = this.proverAddress = undefined
  }
}

const exportedStore = proxy(new JobStore()).makePersistent()

exportedStore.checkJob()

export default exportedStore
