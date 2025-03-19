import { IsEmail, IsEnum, IsNotEmpty, IsNumberString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { OTPType } from '@prisma/client'

export class VerifyOtpCodeDto {
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
    title: 'Type',
    name: 'type',
    description: 'Type of OTP Code',
    example: 'PASSWORD_RESET',
    type: String,
    required: true,
    enum: OTPType
  })
  @IsEnum(OTPType, {
    message: 'Invalid OTP type'
  })
  @IsNotEmpty({
    message: 'Type is required'
  })
  type: OTPType
}
