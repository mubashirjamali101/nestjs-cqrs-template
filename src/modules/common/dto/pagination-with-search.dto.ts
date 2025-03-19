import { IsOptional, IsInt, IsString, Min, Max } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

/**
 * Generic DTO for pagination with optional search functionality
 */
export class PaginationWithSearchDto {
  @ApiProperty({
    name: 'skip',
    description: 'Number of records to skip',
    example: 0,
    required: false,
    type: Number
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  skip?: number

  @ApiProperty({
    name: 'take',
    description: 'Number of records to take',
    example: 20,
    required: false,
    type: Number
  })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  take?: number

  @ApiProperty({
    name: 'search',
    description: 'Search',
    example: '',
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  search?: string
}
