import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { SealHub, SealHub__factory } from '@big-whale-labs/seal-hub-contract'
import { Signer, Wallet } from 'ethers'
import { hashPersonalMessage } from '@ethereumjs/util'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { useEffect } from 'preact/hooks'
import AppStore from 'stores/AppStore'
import StatusBlock from 'components/StatusBlock'
import buffer from 'buffer'
import createProof from 'helpers/createProof'
import env from 'helpers/env'
import makeTransaction from 'helpers/makeTransaction'
import relayProvider from 'helpers/relayProvider'

const { Buffer } = buffer
if (!window.Buffer) window.Buffer = Buffer

export default function () {
  const { address } = useAccount()
  const { data: signer, isLoading } = useSigner()
  const provider = useProvider()

  const loadingText = isLoading
    ? 'Waiting for signature'
    : 'Checking for existing commitment...'

  const subTitle = isLoading
    ? 'We’re requesting your signature to generate your commitment.'
    : 'Hang tight!'

  useEffect(() => {
    const baseMessage = `SealHub verification for ${address}`

    async function start(signer: Signer) {
      try {
        AppStore.flowInit = true
        const readContract = SealHub__factory.connect(
          env.VITE_SEAL_HUB,
          provider
        )
        const messageHash = hashPersonalMessage(Buffer.from(baseMessage))
        const signature = await signer.signMessage(messageHash)
        const proof = await createProof(signature, baseMessage)
        const txData = makeTransaction(proof)
        const hash = txData.input[0]
        if (!(await readContract.commitmentMap(hash))) {
          const gsnProvider = await relayProvider(
            provider as unknown as Web3Provider
          )

          const signer = new Web3Provider(
            gsnProvider as unknown as ExternalProvider
          ).getSigner(0)
          const writeContract = SealHub__factory.connect(
            env.VITE_SEAL_HUB,
            signer
          )
          const tx = await writeContract.createCommitment(
            txData as unknown as ECDSAProofStruct
          )
          const res = await tx.wait()
          console.log(res, tx)
        }
        AppStore.flowSucceeded = true
      } finally {
        AppStore.flowInit = false
      }
    }

    if (!AppStore.flowInit && signer) void start(signer)
  }, [address, signer, provider])

  return (
    <>
      {isLoading && (
        <StatusBlock loadingText={loadingText} subtitle={subTitle} />
      )}
    </>
  )
}
