import { QueryHandler, IQueryHandler } from '@nestjs/cqrs'
import { BadRequestException, Logger } from '@nestjs/common'

// Queries
import { FindUserByEmailQuery } from '../find-user-by-email.query'

// Services
import { PrismaService } from 'src/modules/core/orm/prisma.service'

// Lib
import { tryCatchAsync } from 'src/lib/utils/try-catch'

// Types
import { Result } from 'src/types/common.types'
import { User } from '@prisma/client'

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailHandler implements IQueryHandler<FindUserByEmailQuery> {
  private readonly logger = new Logger(FindUserByEmailHandler.name)

  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindUserByEmailQuery): Promise<Result<Partial<User>>> {
    const { email, status, includePassword } = query.data

    const statusFilter = status
      ? {
          status: Array.isArray(status) ? { in: status } : status
        }
      : {}

    const [user, error] = await tryCatchAsync(() =>
      this.prisma.user.findUnique({
        where: {
          email,
          ...statusFilter
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profilePhotoUrl: true,
          email: true,
          status: true,
          ...(includePassword ? { password: true } : {})
        }
      })
    )

    if (error || !user) {
      this.logger.error(error)
      return [null, new BadRequestException('User not found')]
    }

    return [user, null]
  }
}
