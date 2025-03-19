import { Command } from '@nestjs/cqrs'
import { Result } from 'src/types/common.types'
import { ResetPasswordDto } from '../dto/reset-password.dto'

export class ResetPasswordCommand extends Command<Result<{ success: boolean; message: string }>> {
  constructor(public readonly data: ResetPasswordDto) {
    super()
  }
}
