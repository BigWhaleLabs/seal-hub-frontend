import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Button from 'components/Button'
import startGeneration, { GenerationWay } from 'helpers/proofs/startGeneration'

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
