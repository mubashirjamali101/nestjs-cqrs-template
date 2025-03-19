import { InternalServerErrorException, Logger } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'

// Services
import { PrismaService } from 'src/modules/core/orm/prisma.service'

// Commands
import { CreateOtpCommand } from '../create-otp.command'

// Events
import { OtpCreatedEvent } from '../../events/otp-created.event'

// Generators
import { generateOtp } from 'src/lib/generators/generate-otp'

// Types
import { IResponse, Result } from 'src/types/common.types'

@CommandHandler(CreateOtpCommand)
export class CreateOtpHandler implements ICommandHandler<CreateOtpCommand> {
  private readonly logger = new Logger(CreateOtpHandler.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateOtpCommand): Promise<Result<IResponse<{ otp: string }>>> {
    const { email, type, firstName, lastName, otp } = command.data

    const otpCode = otp || generateOtp()

    // Save OTP to user
    const FIVE_MINUTES_MS = 5 * 60 * 1000
    const expiresAt = new Date(Date.now() + FIVE_MINUTES_MS)

    try {
      await this.prisma.otpCode.create({
        data: {
          code: otpCode,
          expiresAt,
          email: email,
          type
        }
      })
    } catch (error) {
      this.logger.error(error)
      return [null, new InternalServerErrorException('Unable to send OTP. Please try again later')]
    }

    const otpCreatedEvent = new OtpCreatedEvent({
      email,
      otp: otpCode,
      type,
      firstName,
      lastName
    })
    this.eventBus.publish(otpCreatedEvent)

    return [
      {
        data: {
          otp: otpCode
        },
        success: true,
        message: 'OTP sent successfully'
      },
      null
    ]
  }
}
