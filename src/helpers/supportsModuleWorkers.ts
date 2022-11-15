export default function () {
  let supports = false

  const testerFunction = {
    get type(): 'module' | 'classic' {
      supports = true
      return this.type
    },
  }

  try {
    const worker = new Worker('blob://;', testerFunction)
    worker.terminate()
    return supports
  } catch (e) {
    return supports
  }
}
