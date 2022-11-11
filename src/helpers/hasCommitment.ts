import sealHub from 'helpers/sealHub'

export default function (hash: string | bigint) {
  return sealHub.commitmentMap(String(hash))
}
