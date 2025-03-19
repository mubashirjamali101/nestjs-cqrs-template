import { User, UserStatus } from '@prisma/client'
import { Query } from '@nestjs/cqrs'

// Types
import { Result } from 'src/types/common.types'

export class FindUserByEmailQuery extends Query<Result<Partial<User>>> {
  constructor(
    public readonly data: {
      email: string
      status?: UserStatus | UserStatus[]
      includePassword?: boolean
    }
  ) {
    super()

    this.data.status = this.data.status || 'VERIFIED'
    this.data.includePassword = this.data.includePassword || false
  }
}
