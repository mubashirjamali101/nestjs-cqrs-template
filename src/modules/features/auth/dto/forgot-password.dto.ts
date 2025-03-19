import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class ForgotPasswordDto {
  @ApiProperty({
    title: 'Email',
    name: 'email',
    description: 'Email address of the user',
    example: 'john.doe@example.com',
    type: String,
    required: true
  })
  @IsEmail(
    {},
    {
      message: 'Invalid email address'
    }
  )
  email: string
}
