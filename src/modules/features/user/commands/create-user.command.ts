import { Command } from '@nestjs/cqrs'
import { User } from '@prisma/client'

export class CreateUserCommand extends Command<User> {
  constructor(
    public readonly data: {
      firstName: string
      lastName: string
      email: string
      password: string
    }
  ) {
    super()
  }
}
