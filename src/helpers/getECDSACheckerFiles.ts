export default async function () {
  const wasmUrl = 'https://bwl-zk.s3.amazonaws.com/ECDSAChecker.wasm'
  const zkeyUrl = 'https://bwl-zk.s3.amazonaws.com/ECDSAChecker_final.zkey'

  const cache = await caches.open('v1')
  const [wasmCache, zkeyCache] = await getCacheFiles(cache, wasmUrl, zkeyUrl)

  if (wasmCache && zkeyCache)
    return convertResArrToUint8Array([wasmCache, zkeyCache])

  await cache.addAll([wasmUrl, zkeyUrl])
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
