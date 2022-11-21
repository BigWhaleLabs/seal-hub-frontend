import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Button from 'components/Button'
import GenerationWay from 'models/GenerationWay'
import startGeneration from 'helpers/proofs/startGeneration'

export default function ({
  caption,
  generationWay,
  proverAddress,
  disabled,
}: {
  caption: string
  generationWay: GenerationWay
  proverAddress?: string
  disabled?: boolean
}) {
  const { input } = useSnapshot(AppStore)

  return (
    <Button
      disabled={disabled || !input}
      caption={caption}
      onClick={() => startGeneration({ proverAddress, generationWay })}
    >
      Start ZKP generation
    </Button>
  )
}
