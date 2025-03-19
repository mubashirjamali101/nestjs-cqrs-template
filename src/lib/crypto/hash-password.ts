import * as bcrypt from 'bcrypt'

/**
 * @description Hashes the password
 * @param {string} password
 * @returns {string}
 */
export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}
