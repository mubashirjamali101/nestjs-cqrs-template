import { CqrsModule } from '@nestjs/cqrs'
import { Module } from '@nestjs/common'

// Services
import { UserService } from './user.service'

// Controllers
import { UserController } from './user.controller'

// Command Handlers
import { CreateUserHandler } from './commands/handlers/create-user.handler'

// Query Handlers
import { FindUserByEmailHandler } from './queries/handlers/find-user-by-email.handler'
import { FindUserByIdHandler } from './queries/handlers/find-user-by-id.handler'
import { GetUsersHandler } from './queries/handlers/get-users.handler'

const queryHandlers = [GetUsersHandler, FindUserByEmailHandler, FindUserByIdHandler]
const commandHandlers = [CreateUserHandler]

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [UserService, ...queryHandlers, ...commandHandlers]
})
export class UserModule {}
