import { QueryHandler, IQueryHandler } from '@nestjs/cqrs'
import { Logger, NotFoundException } from '@nestjs/common'

// Queries
import { FindUserByIdQuery } from '../find-user-by-id.query'

// Types
import { Result } from 'src/types/common.types'
import { User } from '@prisma/client'
import { PrismaService } from 'src/modules/core/orm/prisma.service'
import { tryCatchAsync } from 'src/lib/utils/try-catch'

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
  private readonly logger = new Logger(FindUserByIdHandler.name)

  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindUserByIdQuery): Promise<Result<Partial<User>>> {
    const { userId } = query.data

    const [user, err] = await tryCatchAsync(() =>
      this.prisma.user.findUnique({
        where: {
          id: userId,
          status: { in: ['VERIFIED', 'UNVERIFIED'] }
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profilePhotoUrl: true,
          email: true,
          status: true
        }
      })
    )

    if (err || !user) {
      this.logger.error(err)
      return [null, new NotFoundException()]
    }

    return [user, null]
  }
}
