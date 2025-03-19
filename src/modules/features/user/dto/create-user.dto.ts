import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'
import { UserStatus } from '@prisma/client'

export class CreateUserDto {
  @IsString({
    message: 'First name must be a string'
  })
  firstName: string

  @IsOptional()
  @IsString({
    message: 'Middle name must be a string'
  })
  middleName: string | null

  @IsString({
    message: 'Last name must be a string'
  })
  lastName: string

  @IsEmail(
    {},
    {
      message: 'Email must be a valid email address'
    }
  )
  email: string

  @IsString({
    message: 'Password must be a string'
  })
  password: string

  @IsBoolean({
    message: 'isSuperAdmin must be a boolean'
  })
  isSuperAdmin: boolean

  @IsEnum(UserStatus, {
    message: `Status must be one of the following values: ${Object.values(UserStatus).join(', ')}`
  })
  status: UserStatus
}
