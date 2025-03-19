import { Command } from '@nestjs/cqrs'
import { Result } from 'src/types/common.types'
import { ForgotPasswordDto } from '../dto/forgot-password.dto'

export class ForgotPasswordCommand extends Command<Result<{ success: boolean; message: string }>> {
  constructor(public readonly data: ForgotPasswordDto) {
    super()
  }
}
