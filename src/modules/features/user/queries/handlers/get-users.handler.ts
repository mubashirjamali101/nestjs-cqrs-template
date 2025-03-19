import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { User } from '@prisma/client'

import { PrismaService } from 'src/modules/core/orm/prisma.service'
import { GetUsersQuery } from '../get-users.query'

// Types
import { IPaginatedResponse } from 'src/types/common.types'

/**
 * @description handler for GetUsersQuery
 */
@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * @description method to execute the query
   * @param {GetUsersQuery} query
   * @returns {Promise<IPaginatedResponse<User[]>>}
   */
  async execute(query: GetUsersQuery): Promise<IPaginatedResponse<User[]>> {
    const { take, skip } = query

    const usersPromise = this.prisma.user.findMany({
      take,
      skip
    })
    const countPromise = this.prisma.user.count({})

    const [count, users] = await Promise.all([countPromise, usersPromise])

    return {
      meta: {
        take,
        skip,
        total: count
      },
      data: users
    }
  }
}
