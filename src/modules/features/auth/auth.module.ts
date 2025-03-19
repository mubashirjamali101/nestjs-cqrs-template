import { Global, Module } from '@nestjs/common'

// Controllers
import { AuthController } from './auth.controller'

// Services
import { TokenVerificationService } from './services/token-verification.service'
import { AuthService } from './auth.service'

// Sagas
import { AuthSaga } from './auth.saga'

// Handlers
import { ForgotPasswordHandler } from './commands/handlers/forgot-password.handler'
import { ResetPasswordHandler } from './commands/handlers/reset-password.handler'
import { GenerateTokenHandler } from './commands/handlers/generate-token.handler'
import { MarkOtpUsedHandler } from './commands/handlers/mark-otp-used.handler'
import { VerifyOtpCodeHandler } from './queries/handlers/verify-otp.handler'
import { CreateOtpHandler } from './commands/handlers/create-otp.handler'
import { SignInHandler } from './commands/handlers/sign-in.handler'
import { AuthGuard } from './guards/auth.guard'

const CommandHandlers = [
  ForgotPasswordHandler,
  ResetPasswordHandler,
  GenerateTokenHandler,
  MarkOtpUsedHandler,
  CreateOtpHandler,
  SignInHandler
]

const QueryHandlers = [VerifyOtpCodeHandler]

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenVerificationService,
    AuthSaga,
    AuthGuard,
    ...CommandHandlers,
    ...QueryHandlers
  ],
  exports: [AuthService, TokenVerificationService, AuthGuard]
})
export class AuthModule {}
