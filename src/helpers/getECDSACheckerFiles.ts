export default async function () {
  const wasmUrl = 'https://bwl-zk.s3.amazonaws.com/ECDSAChecker.wasm'
  const zkeyUrl = 'https://bwl-zk.s3.amazonaws.com/ECDSAChecker_final.zkey'
  const wasmUPrecomputesUrl =
    'https://bwl-zk.s3.amazonaws.com/UPrecomputesChecker.wasm'
  const zkeyUPrecomputesUrl =
    'https://bwl-zk.s3.amazonaws.com/UPrecomputesChecker_final.zkey'

  const cache = await caches.open('v1')
  const [wasmCache, zkeyCache, wasmUPrecomputesCache, zkeyUPrecomputesCache] =
    await getCacheFiles(
      cache,
      wasmUrl,
      zkeyUrl,
      wasmUPrecomputesUrl,
      zkeyUPrecomputesUrl
    )

  if (
    wasmCache &&
    zkeyCache &&
    wasmUPrecomputesCache &&
    zkeyUPrecomputesCache
  ) {
    return convertResArrToUint8Array([
      wasmCache,
      zkeyCache,
      wasmUPrecomputesCache,
      zkeyUPrecomputesCache,
    ])
  }

  await cache.addAll([wasmUrl, zkeyUrl])
  const [
    addedWasmCache,
    addedZkeyCache,
    addedWasmUPrecomputesCache,
    addedZkeyUPrecomputesCache,
  ] = await getCacheFiles(
    cache,
    wasmUrl,
    zkeyUrl,
    wasmUPrecomputesUrl,
    zkeyUPrecomputesUrl
  )
  return addedWasmCache &&
    addedZkeyCache &&
    addedWasmUPrecomputesCache &&
    addedZkeyUPrecomputesCache
    ? convertResArrToUint8Array([
        addedWasmCache,
        addedZkeyCache,
        addedWasmUPrecomputesCache,
        addedZkeyUPrecomputesCache,
      ])
    : [wasmUrl, zkeyUrl, wasmUPrecomputesUrl, zkeyUPrecomputesUrl]
}

function getCacheFiles(cache: Cache, ...files: string[]) {
  return Promise.all(files.map((fileUrl) => cache.match(fileUrl)))
}

function convertResArrToUint8Array(resArr: Response[]) {
  return Promise.all(
    resArr.map(async (res) => {
      const buf = await res.arrayBuffer()
      return new Uint8Array(buf)
    })
  )
}
