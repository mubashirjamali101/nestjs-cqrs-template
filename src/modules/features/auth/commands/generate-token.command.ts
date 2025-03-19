import { Command } from '@nestjs/cqrs'
import { User } from '@prisma/client'
import { Result } from 'src/types/common.types'

export class GenerateTokenCommand extends Command<Result<string>> {
  constructor(public readonly data: Partial<User>) {
    super()
  }
}
