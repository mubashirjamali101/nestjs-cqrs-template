import { Query } from '@nestjs/cqrs'
import { User } from '@prisma/client'
import { IPaginatedResponse } from 'src/types/common.types'

/**
 * @description query to get all users
 */
export class GetUsersQuery extends Query<IPaginatedResponse<User[]>> {
  constructor(
    public readonly skip: number,
    public readonly take: number
  ) {
    super()
  }
}
