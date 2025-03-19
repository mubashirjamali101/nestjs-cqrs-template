import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import * as bcrypt from 'bcrypt'

import { PrismaService } from 'src/modules/core/orm/prisma.service'
import { CreateUserCommand } from '../create-user.command'
import { User } from '@prisma/client'

/**
 * @description handler for CreateUserCommand
 **/
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * @description Executes the CreateUserCommand
   * @param {CreateUserCommand} command
   * @returns {Promise<User>}
   **/
  async execute(command: CreateUserCommand): Promise<User> {
    const { firstName, lastName, email, password } = command.data

    const hashedPassword = await bcrypt.hash(password, 10)

    return this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword
      }
    })
  }
}
