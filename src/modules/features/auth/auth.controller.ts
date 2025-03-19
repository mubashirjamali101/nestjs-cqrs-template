import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

// Services
import { AuthService } from './auth.service'

// Response Examples
import { AUTH_HEADER, InternalServerErrorExample, InvalidPayloadExample } from 'src/lib/constants'

// DTOs
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { VerifyOtpCodeDto } from './dto/verify-otp-code.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { SignInDto } from './dto/sign-in.dto'

// Types
import { AuthenticatedRequest } from 'src/types/auth.types'
import { AuthGuard } from './guards/auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign in',
    description: 'Sign in endpoint.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Sign in successfully',
    example: {
      token: 'v2.public.RANDOM_TOKEN',
      user: {
        id: 'USER_ID',
        firstName: 'John',
        middleName: null,
        lastName: 'Doe',
        profilePhotoUrl: null,
        email: 'john.doe@example.com',
        status: 'VERIFIED'
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid payload',
    example: InvalidPayloadExample
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
    example: {
      message: 'Invalid credentials',
      error: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    example: InternalServerErrorExample
  })
  @Post('sign-in')
  async signIn(@Body() payload: SignInDto) {
    const [resp, exception] = await this.authService.signIn(payload)
    return exception ? exception : resp
  }

  @ApiOperation({
    summary: 'Auth Me',
    description: 'Get the current authenticated user.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Fetched successfully',
    example: {
      token: 'v2.public.RANDOM_TOKEN',
      user: {
        id: 'USER_ID',
        firstName: 'John',
        middleName: null,
        lastName: 'Doe',
        profilePhotoUrl: null,
        email: 'john.doe@example.com',
        status: 'VERIFIED'
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid payload',
    example: InvalidPayloadExample
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
    example: {
      message: 'Invalid credentials',
      error: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    example: InternalServerErrorExample
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(AUTH_HEADER)
  @Get('me')
  async authMe(@Req() { user }: AuthenticatedRequest) {
    if (!user || !user.id) {
      return new UnauthorizedException()
    }
    const [resp, exception] = await this.authService.me(user.id)
    return exception ? exception : resp
  }

  @ApiOperation({
    summary: 'Forgot password',
    description: 'Forgot password endpoint.'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'OTP code sent to email',
    example: {
      message: 'OTP code sent to email',
      success: true
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid payload',
    example: InvalidPayloadExample
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    example: InternalServerErrorExample
  })
  @Post('forgot-password')
  async forgotPassword(@Body() payload: ForgotPasswordDto) {
    const [resp, exception] = await this.authService.forgotPassword(payload)
    return exception ? exception : resp
  }

  @ApiOperation({
    summary: 'Reset password',
    description: 'Reset password endpoint.'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Password reset successfully',
    example: {
      message: 'Password reset successfully',
      success: true
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid payload',
    example: InvalidPayloadExample
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    example: InternalServerErrorExample
  })
  @Post('reset-password')
  async resetPassword(@Body() payload: ResetPasswordDto) {
    const [resp, exception] = await this.authService.resetPassword(payload)
    return exception ? exception : resp
  }

  @ApiOperation({
    summary: 'Verify OTP code',
    description: 'Verify OTP code endpoint, does not expire it. Only for checking if OTP is valid.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'OTP code verified successfully',
    examples: {
      'OTP code verified successfully': {
        summary: 'OTP code verified successfully',
        value: { message: 'OTP code verified successfully', success: true }
      },
      'Invalid OTP code': {
        summary: 'Invalid OTP code',
        value: { message: 'Invalid OTP code', success: false }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid payload',
    example: InvalidPayloadExample
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    example: InternalServerErrorExample
  })
  @Post('verify-otp')
  async verifyOtpCode(@Body() payload: VerifyOtpCodeDto) {
    const [resp, exception] = await this.authService.verifyOtpCode(payload)
    return exception ? exception : resp
  }
}
