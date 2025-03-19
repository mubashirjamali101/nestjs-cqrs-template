import { HttpStatus } from '@nestjs/common'

// configure this to your project needs
export const APP_LOGO_URL = 'https://picsum.photos/200'
export const APP_NAME = 'NestJS Template'
export const DEFAULT_PER_PAGE = 30

export const AUTH_HEADER = 'Bearer Authorization'

export const InternalServerErrorExample = {
  message: 'Internal Server Error',
  error: 'Internal Server Error',
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR
}

export const UnauthorizedExample = {
  message: 'Unauthorized',
  error: 'Unauthorized',
  statusCode: HttpStatus.UNAUTHORIZED
}

export const InvalidPayloadExample = {
  message: ['Example Field is required', 'Example Field must be a string'],
  error: 'Bad Request',
  statusCode: HttpStatus.BAD_REQUEST
}
