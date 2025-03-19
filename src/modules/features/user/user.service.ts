import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

// Commands
import { CreateUserCommand } from './commands/create-user.command'

// Queries
import { GetUsersQuery } from './queries/get-users.query'

// DTOs
import { CreateUserDto } from './dto/create-user.dto'
import { GetUsersDto } from './dto/get-users.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  createUser(payload: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(payload))
  }

  getUsers(params: GetUsersDto) {
    return this.queryBus.execute(new GetUsersQuery(params.skip || 0, params.take || 20))
  }
}
