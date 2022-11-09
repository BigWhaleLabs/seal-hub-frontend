import { Signer } from 'ethers'
import { hashPersonalMessage } from '@ethereumjs/util'
import { useAccount, useSigner } from 'wagmi'
import { useEffect } from 'preact/hooks'
import StatusBlock from 'components/StatusBlock'
import buffer from 'buffer'
import createProof from 'helpers/createProof'
const { Buffer } = buffer

if (!window.Buffer) window.Buffer = Buffer

export default function () {
  const { address } = useAccount()
  const { data: signer, isLoading } = useSigner()

  const loadingText = isLoading
    ? 'Waiting for signature'
    : 'Checking for existing commitment...'

  const subTitle = isLoading
    ? 'We’re requesting your signature to generate your commitment.'
    : 'Hang tight!'

  useEffect(() => {
    async function start(signer: Signer) {
      const baseMessage = `SealHub verification for ${address}`
      const msgHash = hashPersonalMessage(Buffer.from(baseMessage))
      const signature = await signer.signMessage(msgHash)
      console.log(await createProof(signature, baseMessage))
    }

    if (address && signer) void start(signer)
  }, [address, signer])

  return (
    <>
      {isLoading && (
        <StatusBlock loadingText={loadingText} subtitle={subTitle} />
      )}
    </>
  )
}
