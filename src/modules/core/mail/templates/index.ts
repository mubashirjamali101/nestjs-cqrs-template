import { InternalServerErrorException } from '@nestjs/common'
import { Result } from 'src/types/common.types'

// Templates
import ResetPasswordEmailTemplate, {
  IResetPasswordEmailTemplateData
} from './reset-password.template'
import VerifyEmailTemplate, { IVerifyEmailTemplateData } from './verify-email.template'
import PasswordResetEmailTemplate, {
  IPasswordResetEmailTemplateData
} from './password-reset.template'

/**
 * Maps template with their required params
 */
interface MailTemplates {
  /**
   * Used to send Password Reset OTP
   */
  'reset-password': IResetPasswordEmailTemplateData

  /**
   * Used to send Email Verification OTP
   */
  'verify-email': IVerifyEmailTemplateData

  /**
   * Used to send password reset success email
   */
  'password-reset': IPasswordResetEmailTemplateData
}

export const generateEmailContent = <T extends keyof MailTemplates>(
  template: T,
  data: MailTemplates[T]
): Result<string> => {
  if (template === 'reset-password') {
    return [ResetPasswordEmailTemplate(data as IResetPasswordEmailTemplateData), null]
  }
  if (template === 'verify-email') {
    return [VerifyEmailTemplate(data as IVerifyEmailTemplateData), null]
  }
  if (template === 'password-reset') {
    return [PasswordResetEmailTemplate(data as IPasswordResetEmailTemplateData), null]
  }

  return [null, new InternalServerErrorException('Template not found')]
}

export default MailTemplates
