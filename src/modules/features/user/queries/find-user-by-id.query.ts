import { Query } from '@nestjs/cqrs'
import { User } from '@prisma/client'
import { Result } from 'src/types/common.types'

export class FindUserByIdQuery extends Query<Result<Partial<User>>> {
  constructor(
    public readonly data: {
      userId: string
    }
  ) {
    super()
  }
}
