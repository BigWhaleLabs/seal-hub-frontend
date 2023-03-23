import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Button from 'components/Common/Button'
import GenerationWay from 'models/GenerationWay'
import startGeneration from 'helpers/proofs/startGeneration'

export default function ({
  caption,
  disabled,
  generationWay,
  proverAddress,
}: {
  caption: string
  generationWay: GenerationWay
  proverAddress?: string
  disabled?: boolean
}) {
  const { input } = useSnapshot(AppStore)

  return (
    <Button
      caption={caption}
      disabled={disabled || !input}
      onClick={() => startGeneration({ generationWay, proverAddress })}
    >
      Start ZKP generation
    </Button>
  )
}
