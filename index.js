module.exports = {
  signal(value) {
    let listeners = new Set
    return {
      get value() {
        return value
      },
      put(v) {
        value = v
        let tmp = Array.from(listeners)
        listeners.clear()
        tmp.forEach(f => f())
      },
      _(f) {
        listeners.add(f)
        return listeners.delete.bind(listeners, f)
      }
    }
  },
  select(...sigs) {
    return new Promise(r => {
      let cbs = sigs.map(sig => sig._(_ => (cbs.map(cb => cb()), r(sig))))
    })
  }
}
