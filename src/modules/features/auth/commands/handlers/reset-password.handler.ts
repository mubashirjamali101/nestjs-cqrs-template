import { CommandHandler, EventBus, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { BadRequestException, Logger } from '@nestjs/common'

// Service
import { PrismaService } from 'src/modules/core/orm/prisma.service'

// Commands
import { ResetPasswordCommand } from '../reset-password.command'

// Queries
import { VerifyOtpCodeQuery } from '../../queries/verify-otp.query'

// Event
import { PasswordResetEvent } from '../../events/password-reset.event'
import { OtpUsedEvent } from '../../events/otp-used.event'

// Utils
import { hashPassword } from 'src/lib/crypto/hash-password'

// Types
import { Result } from 'src/types/common.types'
import { tryCatchAsync } from 'src/lib/utils/try-catch'

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler implements ICommandHandler<ResetPasswordCommand> {
  private readonly logger = new Logger(ResetPasswordHandler.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus
  ) {}

  /**
   * @description Validate OTP code
   * @param email
   * @param otpCode
   * @returns
   */
  async validateOtp(email: string, otpCode: string) {
    const [result, err] = await this.queryBus.execute(
      new VerifyOtpCodeQuery({ email, otpCode, type: 'PASSWORD_RESET' })
    )

    if (err) {
      this.logger.error(err.message)
      return false
    }

    return result.success
  }

  /**
   * @description Execute reset password command
   * @param command
   * @returns
   */
  async execute(
    command: ResetPasswordCommand
  ): Promise<Result<{ success: boolean; message: string }>> {
    const { email, newPassword, otpCode } = command.data

    const isValid = await this.validateOtp(email, otpCode)

    if (!isValid) {
      return [null, new BadRequestException('Invalid OTP code')]
    }

    const [user, userErr] = await tryCatchAsync(() =>
      this.prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      })
    )

    if (userErr || !user) {
      this.logger.error(userErr)
      return [null, new BadRequestException('User not found')]
    }

    const hashedPassword = hashPassword(newPassword)

    const result = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword
      }
    })

    if (!result) {
      return [null, new BadRequestException('Unable to reset password, please try again later')]
    }

    const otpUsedEvent = new OtpUsedEvent(otpCode, email)
    const passwordResetEvent = new PasswordResetEvent(user)

    this.eventBus.publishAll([otpUsedEvent, passwordResetEvent])

    return [
      {
        success: true,
        message: 'Password reset successfully'
      },
      null
    ]
  }
}
