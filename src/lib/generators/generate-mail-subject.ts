import { OTPType } from '@prisma/client'
import { APP_NAME } from '../constants'

export const generateMailSubject = (otpType: OTPType): string => {
  const tail = ` - ${APP_NAME}`

  if (otpType === 'PASSWORD_RESET') {
    return `Reset Password Request${tail}`
  }

  if (otpType === 'EMAIL_VERIFICATION') {
    return `Email Verification${tail}`
  }

  return `OTP Request${tail}`
}
