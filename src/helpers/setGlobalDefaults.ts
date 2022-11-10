import buffer from 'buffer'

export default function () {
  const { Buffer } = buffer
  if (!window.Buffer) window.Buffer = Buffer
}
