import { HttpException } from '@nestjs/common'

export interface IPaginatedResponse<TData> {
  data: TData
  meta: {
    take: number
    skip: number
    total: number
  }
}

export interface IResponse<TData = never> {
  data?: TData
  message: string
  success: boolean
}

/**
 * Go inspired Result type
 */
export type Result<T = never, E = HttpException> = [T, null] | [null, E]
