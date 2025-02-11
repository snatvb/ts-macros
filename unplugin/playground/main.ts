import { $$escape, Save } from "ts-macros"
import { $map } from "./map"
type Result<T, E> = ({ ok: T } | { err: E }) & {
  $unwrap?(): T
}

namespace Result {
  export function $ok<T, E = unknown>(value: T): Result<T, E> {
    return { ok: value } as Result<T, E>
  }

  export function $err<E, T = unknown>(error: E): Result<T, E> {
    return { err: error } as Result<T, E>
  }

  export function $unwrap(res: Save<Result<any, any>>) {
    return $$escape!(() => {
      // If it's an error, propagate the error to the caller
      if ("err" in res) {
        return res
      }
      return res.ok
    })
  }
}

function main(): Result<string, string> {
  const divideResult = divide(5, 0).$unwrap!()
  return Result.$ok!(`The result is ${divideResult}`)
}

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Result.$err!("Cannot divide by 0")
  }

  return Result.$ok!(a / b)
}
console.log(main())
console.log($map!([1, 2, 3], (num) => num * 2))

document.getElementById("app")!.innerHTML =
  "Check sources in dev tools or inspector"
