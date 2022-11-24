import { BodyText, LinkText } from 'components/UI/Text'
import { useState } from 'preact/hooks'
import InputField from 'components/UI/InputField'
import Option from 'components/StatusesList/Option'
import StartGenerationButton from 'components/BeforeGeneration/StartGenerationButton'
import StatusesList from 'components/StatusesList'
import isUrl, { urlWithBackslash } from 'helpers/isUrl'

export default function () {
  const [value, setValue] = useState('')

  return (
    <>
      <BodyText>
        To spin up your own centralized prover, follow the{' '}
        <LinkText>directions here</LinkText>. And then paste the URL to your
        prover below. This will allow you to use your own centralized server.
      </BodyText>
      <InputField
        pattern={urlWithBackslash.source}
        value={value}
        onChange={({ currentTarget }) => setValue(currentTarget.value)}
        placeholder="Paste prover URL..."
      />
      <StartGenerationButton
        caption="Generates on your own server"
        proverAddress={value}
        disabled={!isUrl(value)}
        generationWay="centralized"
      />
      <StatusesList>
        <Option complete={true}>Commitment generated</Option>
      </StatusesList>
    </>
  )
}
