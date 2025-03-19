import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// External libraries
import { createPublicKey, KeyObject } from 'crypto'
import { V2 as Paseto } from 'paseto'

// Services
import { PrismaService } from 'src/modules/core/orm/prisma.service'

// Types
import { Result } from 'src/types/common.types'
import { User } from '@prisma/client'

export interface DecodedToken extends Partial<User> {
  iat: number
  exp: number
}

@Injectable()
export class TokenVerificationService {
  private readonly logger = new Logger(TokenVerificationService.name)
  private publicKey: KeyObject

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService
  ) {
    const publicKeyString = this.configService.get<string>('app.pasetoPublicKey')
    if (!publicKeyString) {
      throw new Error('Paseto public key is required')
    }
    this.publicKey = createPublicKey(publicKeyString)
  }

  /**
   * Verifies and decodes a Paseto token
   * @param token - The Paseto token to verify
   * @returns The decoded token payload
   * @throws UnauthorizedException on invalid token
   */
  async verifyToken(token: string): Promise<Result<DecodedToken>> {
    try {
      const payload = await Paseto.verify<DecodedToken>(token, this.publicKey)

      const expiresAt = new Date(payload.exp * 1000)
      const isExpired = expiresAt < new Date()

      // Verify token hasn't expired
      if (isExpired) {
        return [null, new UnauthorizedException('Token has expired')]
      }

      return [payload, null]
    } catch (error) {
      this.logger.error(error)
      return [null, new UnauthorizedException('Invalid authentication token')]
    }
  }

  /**
   * Verifies token and checks if user exists in database
   * @param token - The Paseto token to verify
   * @returns The user associated with the token
   * @throws UnauthorizedException if token invalid or user not found
   */
  async verifyTokenAndGetUser(token: string): Promise<Result<User>> {
    const [decodedToken, decodeErr] = await this.verifyToken(token)

    if (decodeErr) {
      return [null, new UnauthorizedException()]
    }

    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: decodedToken.id as string }
      })

      if (!user) {
        return [null, new UnauthorizedException()]
      }

      return [user, null]
    } catch (error) {
      this.logger.error(error)
      return [null, new UnauthorizedException()]
    }
  }
}
