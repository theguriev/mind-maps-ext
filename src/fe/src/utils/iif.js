import { isFunction } from 'lodash'

/**
 * Wrap anything (except function) to function.
 * @param candidate Function candidate.
 */
function wrapToFunction (candidate) {
  if (isFunction(candidate)) {
    return candidate
  }
  return () => candidate
}

/**
 * Decide by condition which function we should run.
 *
 * @param condition Condition
 * @param fn1 Function or true result.
 * @param fn2 Function or false result.
 */
export default function (condition, fn1, fn2) {
  return function (...args) {
    if (wrapToFunction(condition)(...args) === true) {
      return wrapToFunction(fn1)(...args)
    }
    return wrapToFunction(fn2)(...args)
  }
}
