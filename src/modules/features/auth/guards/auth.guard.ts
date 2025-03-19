// src/auth/guards/auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { TokenVerificationService } from '../services/token-verification.service'

import { AuthenticatedRequest } from 'src/types/auth.types'
import { IS_PUBLIC_KEY } from '../decorators/auth.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name)

  constructor(
    private readonly tokenVerificationService: TokenVerificationService,
    private readonly reflector: Reflector
  ) {}

  /**
   * Determines if the request can proceed based on token validity
   * @param context - The execution context
   * @returns Boolean indicating if the request is authorized
   * @throws UnauthorizedException on invalid token
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if endpoint is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()

    const token = this.extractTokenFromRequest(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    // Verify token and attach user to request
    try {
      const [decodedToken, decodeErr] = await this.tokenVerificationService.verifyToken(token)
      if (decodeErr) {
        throw new UnauthorizedException()
      }
      request.user = decodedToken

      return true
    } catch (error) {
      this.logger.error(error)
      throw new UnauthorizedException()
    }
  }

  /**
   * Extracts token from Authorization header or cookies
   * @param request - The HTTP request
   * @returns The extracted token or null if not found
   */
  private extractTokenFromRequest(request: AuthenticatedRequest): string | null {
    const authHeader = request.headers?.['authorization']

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7)
    }

    return null
  }
}
