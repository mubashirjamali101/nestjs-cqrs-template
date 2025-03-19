import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'

export class ResetPasswordDto {
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
  @IsNotEmpty({
    message: 'Email is required'
  })
  email: string

  @ApiProperty({
    title: 'OTP Code',
    name: 'otpCode',
    description: 'OTP Code that user received in email',
    example: '123456',
    type: String,
    required: true
  })
  @IsNumberString(
    {
      locale: 'en-US',
      no_symbols: true
    },
    {
      message: 'OTP Code must be a number or a numeric string'
    }
  )
  @IsNotEmpty({
    message: 'OTP Code is required'
  })
  otpCode: string

  @ApiProperty({
    title: 'New Password',
    name: 'newPassword',
    description: 'New password that user wants to set',
    example: '#ExtremelySecurePassword^065',
    type: String,
    required: true
  })
  @IsString({
    message: 'Invalid password'
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long'
  })
  @MaxLength(25, {
    message: 'Password can not be longer than 25 characters'
  })
  @IsNotEmpty({
    message: 'New Password is required'
  })
  newPassword: string
}
