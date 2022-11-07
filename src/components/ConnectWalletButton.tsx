import { useConnectModal, useSignMessage } from '@web3modal/react'
import WalletContext from 'helpers/WalletContext'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  flexWrap,
  gap,
  justifyContent,
  padding,
  textColor,
  transitionProperty,
  wordBreak,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  flexWrap('flex-wrap'),
  alignItems('items-center'),
  gap('gap-2')
)
const blocksContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  flexWrap('flex-wrap'),
  alignItems('items-center'),
  gap('gap-2')
)
const button = classnames(
  backgroundColor('bg-gold-dark'),
  borderRadius('rounded-full'),
  padding('px-4', 'py-3'),
  textColor('text-white'),
  borderWidth('border'),
  borderColor('border-white')
)
const addressContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-x-2'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  backgroundColor('bg-gold-dark'),
  borderRadius('rounded-full'),
  padding('px-4', 'py-3'),
  textColor('text-white'),
  transitionProperty('transition-colors'),
  borderWidth('border'),
  borderColor('border-white'),
  wordBreak('break-all')
)
export default function () {
  const { open } = useConnectModal()
  const { signature, sign } = useSignMessage()
  return (
    <WalletContext.Consumer>
      {({ address, connected, name, ownsToken }) => (
        <div className={container}>
          {!connected && (
            <button type="button" className={button} onClick={open}>
              Connect wallet!
            </button>
          )}
          {connected && (
            <div className={blocksContainer}>
              <div className={addressContainer}>{name || address}</div>
              {ownsToken && !signature && (
                <button
                  type="button"
                  className={button}
                  onClick={() => {
                    void sign('Sign for SealHub')
                  }}
                >
                  Sign message
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </WalletContext.Consumer>
  )
}
