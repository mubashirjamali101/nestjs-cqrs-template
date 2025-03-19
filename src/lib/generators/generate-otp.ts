/**
 * @description Generate a random OTP of a given length
 * @param {number} length - The length of the OTP to generate
 * @returns {Promise<string>} - The generated OTP
 */
export const generateOtp = (length: number = 6): string => {
  const digits = '0123456789'
  return Array.from({ length }, () => digits[Math.floor(Math.random() * digits.length)]).join('')
}
