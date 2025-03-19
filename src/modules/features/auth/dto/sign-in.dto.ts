import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignInDto {
  @ApiProperty({
    name: 'email',
    type: 'string',
    description: 'Email address',
    required: true,
    example: 'john.doe@example.com'
  })
  @IsEmail(
    {},
    {
      message: 'Invalid email'
    }
  )
  @IsNotEmpty({
    message: 'Email is required'
  })
  email: string

  @ApiProperty({
    name: 'password',
    type: 'string',
    description: 'Password',
    required: true,
    example: 'password'
  })
  @IsString({
    message: 'Password must be a string'
  })
  @IsNotEmpty({
    message: 'Password is required'
  })
  password: string
}
