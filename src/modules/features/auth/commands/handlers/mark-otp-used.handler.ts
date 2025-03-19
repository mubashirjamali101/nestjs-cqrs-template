import { InternalServerErrorException, Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

// Services
import { PrismaService } from 'src/modules/core/orm/prisma.service'

// Command
import { MarkOtpUsedCommand } from '../mark-otp-used.command'

// Utils
import { tryCatchAsync } from 'src/lib/utils/try-catch'

// Types
import { Result } from 'src/types/common.types'

@CommandHandler(MarkOtpUsedCommand)
export class MarkOtpUsedHandler implements ICommandHandler<MarkOtpUsedCommand> {
  private readonly logger = new Logger(MarkOtpUsedHandler.name)

  constructor(private readonly prisma: PrismaService) {}

  async execute(
    command: MarkOtpUsedCommand
  ): Promise<Result<{ success: boolean; message: string }>> {
    const { email, otpCode } = command.data

    const [, error] = await tryCatchAsync(() =>
      this.prisma.otpCode.updateMany({
        where: {
          email,
          code: otpCode
        },
        data: {
          usedAt: new Date()
        }
      })
    )

    if (error) {
      this.logger.error(error)
      return [null, new InternalServerErrorException(error.message)]
    }

    return [
      {
        message: 'OTP code marked as used',
        success: true
      },
      null
    ]
  }
}
