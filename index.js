module.exports = {
  signal() {
    let notify = () => Array.from(notify._).map(f => f())
    notify._ = new Set
    return notify
  },
  select(...sigs) {
    return new Promise(r => {
      let cbs = sigs.map(sig => {
        let f = () => { cbs.map(cb => cb()); r(sig) }
        sig._.add(f)
        return () => sig._.delete(f)
      })
    })
  }
}
