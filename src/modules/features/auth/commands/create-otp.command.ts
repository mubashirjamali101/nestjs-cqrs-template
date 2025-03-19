import { Command } from '@nestjs/cqrs'
import { OTPType } from '@prisma/client'
import { IResponse, Result } from 'src/types/common.types'

export class CreateOtpCommand extends Command<Result<IResponse<{ otp: string }>>> {
  constructor(
    public readonly data: {
      email: string
      type: OTPType
      firstName: string
      lastName: string
      otp?: string
    }
  ) {
    super()
  }
}
