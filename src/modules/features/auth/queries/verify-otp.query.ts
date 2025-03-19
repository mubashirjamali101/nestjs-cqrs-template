import { Query } from '@nestjs/cqrs'
import { Result } from 'src/types/common.types'
import { VerifyOtpCodeDto } from '../dto/verify-otp-code.dto'

export class VerifyOtpCodeQuery extends Query<Result<{ success: boolean; message: string }>> {
  constructor(public readonly data: VerifyOtpCodeDto) {
    super()
  }
}
