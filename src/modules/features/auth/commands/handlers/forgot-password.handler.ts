import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'

// Commands
import { ForgotPasswordCommand } from '../forgot-password.command'
import { CreateOtpCommand } from '../create-otp.command'

// Queries
import { FindUserByEmailQuery } from 'src/modules/features/user/queries/find-user-by-email.query'

// Types
import { Result } from 'src/types/common.types'

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler implements ICommandHandler<ForgotPasswordCommand> {
  private readonly logger = new Logger(ForgotPasswordHandler.name)

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(
    command: ForgotPasswordCommand
  ): Promise<Result<{ success: boolean; message: string }>> {
    const { email } = command.data
    const [user, findUserErr] = await this.queryBus.execute(
      new FindUserByEmailQuery({ email, status: ['VERIFIED', 'UNVERIFIED'] })
    )

    if (findUserErr || !user) {
      this.logger.error(findUserErr)
      // If user is not found or there is an error, return success as true to prevent user enumeration
      return [
        {
          success: true,
          message: 'Email sent successfully'
        },
        null
      ]
    }

    this.commandBus.execute(
      new CreateOtpCommand({
        email: user.email as string,
        type: 'PASSWORD_RESET',
        firstName: user.firstName as string,
        lastName: user.lastName as string
      })
    )

    return [
      {
        message: 'Email sent successfully',
        success: true
      },
      null
    ]
  }
}
