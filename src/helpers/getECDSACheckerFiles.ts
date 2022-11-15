import AppStore from 'stores/AppStore'
import axios from 'axios'

export default async function () {
  const wasm = await axios({
    url: 'https://bwl-zk.s3.amazonaws.com/ECDSAChecker.wasm',
    onDownloadProgress({ progress }) {
      console.log('download wasm progress:', progress)
      AppStore.wasmDownloadProgress = progress || 0
    },
  })

  const zkey = await axios({
    url: 'https://bwl-zk.s3.amazonaws.com/ECDSAChecker_final.zkey',
    onDownloadProgress({ progress }) {
      console.log('download final.zkey progress:', progress)
      AppStore.zkDownloadProgress = progress || 0
    },
  })

  return [wasm, zkey]
}
