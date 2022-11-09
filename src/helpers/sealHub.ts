import { SealHub__factory } from '@big-whale-labs/seal-hub-contract'
import defaultProvider from 'helpers/defaultProvider'
import env from 'helpers/env'

export default SealHub__factory.connect(env.VITE_SEAL_HUB, defaultProvider)
