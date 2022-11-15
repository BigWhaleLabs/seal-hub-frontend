import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { ErrorType } from 'types/ErrorType'
import { PersistableStore } from '@big-whale-labs/stores'
import { Phase } from 'types/flowPhase'
import { ProofInput } from 'models/ProofInput'
import { STATES } from 'types/SigningStates'
import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import env from 'helpers/env'

class AppStore extends PersistableStore {
  isSignRequested: { [address: string]: boolean } = {}
  wallet?: string
  walletFlow: {
    [wallet: string]: {
      phase: Phase
      flowState: STATES
      error?: ErrorType
    }
  } = {}
  connected = false

  inputs: { [wallet: string]: ProofInput } = {}
  proofs: { [wallet: string]: ECDSAProofStruct } = {}
  commitments: { [wallet: string]: bigint } = {}

  replacer = (key: string, value: unknown) => {
    const disallowList = ['wallet', 'commitment', 'input', 'proof']
    const v = key === 'commitments' ? (value as bigint).toString() : value
    return disallowList.includes(key) ? undefined : v
  }
  reviver = (key: string, value: unknown) => {
    if (key === 'commitments') {
      const v = value as string
      return BigInt(v.slice(0, v.length - 1))
    }
    return value
  }

  initWalletFlow(address: string) {
    this.walletFlow[address] = {
      ...this.walletFlow[address],
      phase: Phase.INIT,
      flowState: STATES.INIT,
      error: undefined,
    }
  }

  resetOnDisconnect() {
    this.connected = false
    this.wallet = undefined
  }
}

const state = proxy(new AppStore())

export default derive(
  {
    phase: (get) => {
      const { wallet, walletFlow } = get(state)
      return wallet ? walletFlow[wallet]?.phase ?? Phase.INIT : Phase.INIT
    },
    flowState: (get) => {
      const { wallet, walletFlow } = get(state)
      return wallet ? walletFlow[wallet]?.flowState ?? STATES.INIT : STATES.INIT
    },
    error: (get) => {
      const { wallet, walletFlow } = get(state)
      return wallet ? walletFlow[wallet].error : undefined
    },
    input: (get) => {
      const { wallet, inputs } = get(state)
      return wallet ? inputs[wallet] : undefined
    },
    proof: (get) => {
      const { wallet, proofs } = get(state)
      return wallet ? proofs[wallet] : undefined
    },
    commitment: (get) => {
      const { wallet, commitments } = get(state)
      return wallet ? commitments[wallet] : undefined
    },
  },
  { proxy: state }
).makePersistent(env.VITE_ENCRYPT_KEY)
