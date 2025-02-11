export function $map<T, R>(arr: Array<T>, cb: (el: T) => R): Array<R> {
  const array = arr
  const res = []
  for (let i = 0; i < array.length; i++) {
    res.push(cb(array[i]))
  }
  return res
}
