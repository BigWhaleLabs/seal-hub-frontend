import {
  GSN_PAYMASTER_CONTRACT_ADDRESS,
  GSN_SC_RELAY,
} from '@big-whale-labs/constants'
import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_ALCHEMY_API_KEY: str(),
  VITE_SEAL_HUB: str(),
  VITE_GSN_PAYMASTER_CONTRACT_ADDRESS: str({
    default: GSN_PAYMASTER_CONTRACT_ADDRESS,
  }),
  VITE_GSN_SC_RELAY: str({ default: GSN_SC_RELAY }),
})
