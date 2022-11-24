import { BodyText, GradientText } from 'components/Common/Text'
import { Phase } from 'models/FlowPhase'
import { cursor } from 'classnames/tailwind'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useAccount } from 'wagmi'
import AppStore from 'stores/AppStore'
import BottomButtonsWrapper from 'components/BeforeGeneration/BottomButtonsWrapper'
import GenerationContainer from 'components/BeforeGeneration/GenerationContainer'
import StartGenerationButton from 'components/BeforeGeneration/StartGenerationButton'
import env from 'helpers/env'
import isMobileDevice from 'helpers/isMobile'

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
      <BottomButtonsWrapper
        leftButton={
          <StartGenerationButton
            caption="Generates on SealHub server"
            proverAddress={env.VITE_SEAL_HUB_PROVER_ADDRESS}
            generationWay="centralized"
          />
        }
        rightButton={
          isMobileDevice() ? undefined : (
            <div
              className={cursor('cursor-pointer')}
              onClick={() => (AppStore.phase = Phase.readyDecentralized)}
            >
              <GradientText center animatedOnHover>
                Generate on a decentralized prover
              </GradientText>
            </div>
          )
        }
      />
    </GenerationContainer>
  )
}
