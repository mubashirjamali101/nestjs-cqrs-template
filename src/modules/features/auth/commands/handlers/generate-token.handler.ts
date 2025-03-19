import { InternalServerErrorException, Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { createPrivateKey, KeyObject } from 'node:crypto'
import { ConfigService } from '@nestjs/config'
import { V2 as Paseto } from 'paseto'

// Commands
import { GenerateTokenCommand } from '../generate-token.command'

// Types
import { Result } from 'src/types/common.types'
import { User } from '@prisma/client'

export type GenerateTokenResult = Promise<Result<string>>

@CommandHandler(GenerateTokenCommand)
export class GenerateTokenHandler implements ICommandHandler<GenerateTokenCommand> {
  private readonly logger = new Logger(GenerateTokenHandler.name)
  private PrivateKey: KeyObject

  constructor(private readonly configService: ConfigService) {
    const privateKey = this.configService.get<string>('app.pasetoPrivateKey')
    if (!privateKey) {
      throw new Error('Paseto private key is required')
    }
    this.PrivateKey = createPrivateKey(privateKey)
  }

  async generateToken(user: Partial<User>) {
    try {
      const THIRTY_DAYS_MS = 1000 * 60 * 60 * 24 * 30
      const payload = {
        ...user,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor((Date.now() + THIRTY_DAYS_MS) / 1000)
      }

      const token = await Paseto.sign(payload, this.PrivateKey, {
        expiresIn: '30d'
      })

      return token
    } catch (error) {
      this.logger.error(error)
      return null
    }
  }

  async execute(command: GenerateTokenCommand): GenerateTokenResult {
    try {
      const token = await this.generateToken(command.data)
      if (!token) {
        return [null, new InternalServerErrorException('Something went wrong')]
      }
      return [token, null]
    } catch (error) {
      this.logger.error(error)
      return [null, new InternalServerErrorException('Something went wrong')]
    }
  }
}
