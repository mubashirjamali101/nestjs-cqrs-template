import { Command } from '@nestjs/cqrs'

// Types
import { Result } from 'src/types/common.types'

export class MarkOtpUsedCommand extends Command<Result<{ success: boolean; message: string }>> {
  constructor(
    public readonly data: {
      email: string
      otpCode: string
    }
  ) {
    super()
  }
}
