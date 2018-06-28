let uid = -1

export default () => {
  const functions = {}
  const instance = {}

  const add = (fn) => {
    uid++

    functions[uid] = fn
  }

  const remove = (fId) => {
    delete functions[fId]
  }

  const run = (fId) => {
    if (fId === undefined) {
      return
    }

    functions[fId]()
  }

  const runAll = () => {
    for (let fId in functions) {
      if (functions.hasOwnProperty(fId)) {
        functions[fId]()
      }
    }
  }

  // Public methods
  instance.add = add
  instance.remove = remove
  instance.runAll = runAll
  instance.run = run

  return instance
}
