import { Command } from '@nestjs/cqrs'
import { User } from '@prisma/client'
import { Result } from 'src/types/common.types'

export class SignInCommand extends Command<
  Result<{
    token: string
    user: Partial<User>
  }>
> {
  constructor(
    public readonly data: {
      email: string
      password: string
    }
  ) {
    super()
  }
}
