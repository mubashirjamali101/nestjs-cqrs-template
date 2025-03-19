import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { Logger, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

// Commands
import { GenerateTokenCommand } from '../generate-token.command'
import { SignInCommand } from '../sign-in.command'

// Queries
import { FindUserByEmailQuery } from 'src/modules/features/user/queries/find-user-by-email.query'

// Types
import { Result } from 'src/types/common.types'
import { User } from '@prisma/client'

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  private readonly logger = new Logger(SignInHandler.name)

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: SignInCommand): Promise<
    Result<{
      token: string
      user: Partial<User>
    }>
  > {
    const { email, password } = command.data

    const [user, findUserErr] = await this.queryBus.execute(
      new FindUserByEmailQuery({ email, status: 'VERIFIED', includePassword: true })
    )

    if (!user || findUserErr) {
      this.logger.log(`User not found: ${email}`)
      this.logger.error(findUserErr)
      return [null, new UnauthorizedException('Invalid credentials')]
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password as string)

    if (!isPasswordValid) {
      this.logger.log(`Invalid password for user: ${email}`)
      return [null, new UnauthorizedException('Invalid credentials')]
    }

    const safeUser = { ...user, password: undefined }

    const tokenPayload = {
      ...safeUser,
      orgUserMaps: undefined
    }

    const [token, exception] = await this.commandBus.execute(new GenerateTokenCommand(tokenPayload))

    if (exception) {
      return [null, new UnauthorizedException('Invalid credentials')]
    }

    this.logger.verbose(`User signed in: ${email}`)

    return [
      {
        token,
        user: safeUser
      },
      null
    ]
  }
}
