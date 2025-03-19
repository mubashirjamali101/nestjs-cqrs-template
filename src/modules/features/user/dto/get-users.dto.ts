import { IsOptional, IsString } from 'class-validator'

export class GetUsersDto {
  @IsString({
    message: 'skip'
  })
  skip: number

  @IsOptional()
  @IsString({
    message: 'skip'
  })
  take: number
}
