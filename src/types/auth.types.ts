import { User } from '@prisma/client'
import { FastifyRequest } from 'fastify'

export interface DecodedToken extends Partial<User> {
  iat: number
  exp: number
}

// Fastify-specific request with user augmentation
export interface AuthenticatedRequest extends FastifyRequest {
  user?: DecodedToken
}
