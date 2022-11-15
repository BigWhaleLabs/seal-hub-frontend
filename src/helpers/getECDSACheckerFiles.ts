import AppStore from 'stores/AppStore'
import axios from 'axios'

export default async function () {
  const wasmUrl = 'https://bwl-zk.s3.amazonaws.com/ECDSAChecker.wasm'
  const zkeyUrl = 'https://bwl-zk.s3.amazonaws.com/ECDSAChecker_final.zkey'

  const cache = await caches.open('v1')
  const [wasmCache, zkeyCache] = await getCacheFiles(cache, wasmUrl, zkeyUrl)

  if (wasmCache && zkeyCache)
    return convertResArrToUint8Array([wasmCache, zkeyCache])

  const zkey = await axios({
    url: zkeyUrl,
    onDownloadProgress({ progress }) {
      AppStore.zkDownloadProgress = progress || 0
    },
  })

  await cache.put(zkeyUrl, new Response(zkey.data))
  await cache.addAll([wasmUrl])

  const [addedWasmCache, addedZkeyCache] = await getCacheFiles(
    cache,
    wasmUrl,
    zkeyUrl
  )
  return addedWasmCache && addedZkeyCache
    ? convertResArrToUint8Array([addedWasmCache, addedZkeyCache])
    : [wasmUrl, zkeyUrl]
}

function getCacheFiles(cache: Cache, wasmUrl: string, zkeyUrl: string) {
  return Promise.all([cache.match(wasmUrl), cache.match(zkeyUrl)])
}

function convertResArrToUint8Array(resArr: Response[]) {
  return Promise.all(
    resArr.map(async (res) => {
      const buf = await res.arrayBuffer()
      return new Uint8Array(buf)
    })
  )
}
