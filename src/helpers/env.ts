import {
  ETH_NETWORK,
  ETH_RPC,
  GSN_PAYMASTER_CONTRACT_ADDRESS,
  GSN_SC_RELAY,
  SEAL_HUB_CONTRACT_ADDRESS,
  SEAL_HUB_PROVER_ADDRESS,
} from '@big-whale-labs/constants'
import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_ENCRYPT_KEY: str({
    default: 'SECRET_KEY',
  }),
  VITE_ETH_RPC: str({ default: ETH_RPC }),
  VITE_ETH_NETWORK: str({ default: ETH_NETWORK }),
  VITE_SEAL_HUB_CONTRACT: str({ default: SEAL_HUB_CONTRACT_ADDRESS }),
  VITE_SEAL_HUB_PROVER_ADDRESS: str({
    default: SEAL_HUB_PROVER_ADDRESS,
  }),
  VITE_GSN_PAYMASTER_CONTRACT_ADDRESS: str({
    default: GSN_PAYMASTER_CONTRACT_ADDRESS,
  }),
  VITE_GSN_SC_RELAY: str({ default: GSN_SC_RELAY }),
})
