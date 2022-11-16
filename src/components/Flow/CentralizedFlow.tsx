import { BodyText, LinkText } from 'components/Text'
import { useState } from 'preact/hooks'
import InputField from 'components/InputField'
import Option from 'components/StatusesList/Option'
import StartGenerationButton from 'components/BeforeGeneration/StartGenerationButton'
import StatusesList from 'components/StatusesList'

export default function () {
  const [value] = useState('')

  return (
    <>
      <BodyText>
        To spin up your own centralized prover, follow the{' '}
        <LinkText>directions here</LinkText>. And then paste the URL to your
        prover below. This will allow you to use your own centralized server.
      </BodyText>
      <InputField type="url" value={value} placeholder="Paste prover URL..." />
      <StartGenerationButton caption="Generates on your own server" />
      <StatusesList>
        <Option complete={true}>Commitment generated</Option>
      </StatusesList>
    </>
  )
}
