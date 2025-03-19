import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Injectable } from '@nestjs/common'

// Commands
import { ForgotPasswordCommand } from './commands/forgot-password.command'
import { ResetPasswordCommand } from './commands/reset-password.command'
import { SignInCommand } from './commands/sign-in.command'

// Queries
import { VerifyOtpCodeQuery } from './queries/verify-otp.query'

// DTOs
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { VerifyOtpCodeDto } from './dto/verify-otp-code.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { SignInDto } from './dto/sign-in.dto'
import { FindUserByIdQuery } from '../user/queries/find-user-by-id.query'

@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  me(userId: string) {
    return this.queryBus.execute(new FindUserByIdQuery({ userId }))
  }

  signIn(credentials: SignInDto) {
    return this.commandBus.execute(new SignInCommand(credentials))
  }

  forgotPassword(payload: ForgotPasswordDto) {
    return this.commandBus.execute(new ForgotPasswordCommand(payload))
  }

  resetPassword(payload: ResetPasswordDto) {
    return this.commandBus.execute(new ResetPasswordCommand(payload))
  }

  verifyOtpCode(payload: VerifyOtpCodeDto) {
    return this.queryBus.execute(new VerifyOtpCodeQuery(payload))
  }
}
