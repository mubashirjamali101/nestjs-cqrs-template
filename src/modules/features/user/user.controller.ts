import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

// Services
import { UserService } from './user.service'

// DTOs
// import { CreateUserDto } from './dto/create-user.dto'
// import { GetUsersDto } from './dto/get-users.dto'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @ApiOperation({
  //   summary: 'Create a new user'
  // })
  // @Post('signup')
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.createUser(createUserDto)
  // }

  // @ApiOperation({ summary: 'Get all users' })
  // @Get('users')
  // getUsers(@Body() params: GetUsersDto) {
  //   return this.userService.getUsers(params)
  // }
}
