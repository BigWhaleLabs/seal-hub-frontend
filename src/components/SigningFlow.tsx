import { ECDSAProofStruct } from '@big-whale-labs/seal-hub-contract/dist/typechain/contracts/SealHub'
import { SealHub, SealHub__factory } from '@big-whale-labs/seal-hub-contract'
import { Signer, Wallet } from 'ethers'
import { hashPersonalMessage } from '@ethereumjs/util'
import { useAccount, useContract, useProvider, useSigner } from 'wagmi'
import { useEffect } from 'preact/hooks'
import AppStore from 'stores/AppStore'
import StatusBlock from 'components/StatusBlock'
import createProof from 'helpers/createProof'
import makeTransaction from 'helpers/makeTransaction'

const wallet = new Wallet(
  '52a3552aa62636873b378a5f63e7925621764c89f408ed5ecd8b27719faedc3f'
)

export default function () {
  const { address } = useAccount()
  const { data: signer, isLoading } = useSigner()
  const provider = useProvider()
  const contract = useContract({
    address: '0x812c83CD01b59bBcd4d29950D99fcBee9354adD7',
    abi: SealHub__factory.abi,
    signerOrProvider: wallet.connect(provider),
  })

  const loadingText = isLoading
    ? 'Waiting for signature'
    : 'Checking for existing commitment...'

  const subTitle = isLoading
    ? 'We’re requesting your signature to generate your commitment.'
    : 'Hang tight!'

  useEffect(() => {
    const baseMessage = `SealHub verification for ${address}`

    async function start(signer: Signer, contract: SealHub) {
      try {
        AppStore.flowInit = true
        const messageHash = hashPersonalMessage(Buffer.from(baseMessage))
        const signature = await signer.signMessage(messageHash)
        const proof = await createProof(signature, baseMessage)
        const txData = makeTransaction(proof)
        const hash = txData.input[0]
        if (!(await contract.commitmentMap(hash))) {
          const tx = await contract.createCommitment(
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

    if (!AppStore.flowInit && signer && contract)
      void start(signer, contract as SealHub)
  }, [address, signer, contract])

  return (
    <>
      {isLoading && (
        <StatusBlock loadingText={loadingText} subtitle={subTitle} />
      )}
    </>
  )
}
