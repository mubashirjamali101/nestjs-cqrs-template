import { Result } from 'src/types/common.types'

/**
 * @description Try catch block for handling errors
 * @param {Function} fn
 * @returns {Result<T, E>}
 */
export const tryCatch = <T, E = Error>(fn: () => T): Result<T, E> => {
  try {
    return [fn(), null]
  } catch (error) {
    return [null, error as E]
  }
}

/**
 * @description Try catch block for handling errors in async functions
 * @param {Function} fn
 * @returns {Promise<Result<T, E>>}
 */
export const tryCatchAsync = async <T, E = Error>(fn: () => Promise<T>): Promise<Result<T, E>> => {
  try {
    return [await fn(), null]
  } catch (error) {
    return [null, error as E]
  }
}
