export default async function () {
  const wasmUrl = 'https://bwl-zk.s3.amazonaws.com/ECDSAChecker.wasm'
  const zkeyUrl = 'https://bwl-zk.s3.amazonaws.com/ECDSAChecker_final.zkey'

  const cache = await caches.open('v1')
  const [wasmCache, zkeyCash] = await getCacheFiles(cache, wasmUrl, zkeyUrl)

  if (wasmCache && zkeyCash)
    return convertResArrToUint8Array([wasmCache, zkeyCash])

  await cache.addAll([wasmUrl, zkeyUrl])
  const [addedWasmCache, addedZkeyCash] = await getCacheFiles(
    cache,
    wasmUrl,
    zkeyUrl
  )
  return addedWasmCache && addedZkeyCash
    ? convertResArrToUint8Array([addedWasmCache, addedZkeyCash])
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
