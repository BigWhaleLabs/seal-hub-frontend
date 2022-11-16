import { BodyText } from 'components/Text'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useAccount } from 'wagmi'
import GenerationContainer from 'components/BeforeGeneration/GenerationContainer'
import StartGenerationButton from 'components/BeforeGeneration/StartGenerationButton'

export default function () {
  const { address } = useAccount()

  if (!address) return null

  return (
    <GenerationContainer>
      <BodyText>
        Your browser currently isn’t able to generate ecdsa proofs. You can
        choose to use SealHub’s centralized prover, or you can spin up your own
        with the directions below.
      </BodyText>
      <BodyText>
        Get commitment on chain for {truncateMiddleIfNeeded(address, 16)} using
        a centralized SealHub prover?
      </BodyText>
      <StartGenerationButton caption="Generates on SealHub server" />
    </GenerationContainer>
  )
}
