import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

// Service
import { PrismaService } from 'src/modules/core/orm/prisma.service'

// Query
import { VerifyOtpCodeQuery } from '../verify-otp.query'

// Types
import { Result } from 'src/types/common.types'

@QueryHandler(VerifyOtpCodeQuery)
export class VerifyOtpCodeHandler implements IQueryHandler<VerifyOtpCodeQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: VerifyOtpCodeQuery): Promise<Result<{ success: boolean; message: string }>> {
    const { otpCode, email, type } = query.data

    const otp = await this.prisma.otpCode.findFirst({
      select: {
        id: true,
        code: true,
        email: true,
        expiresAt: true,
        usedAt: true,
        type: true
      },
      where: {
        email,
        code: otpCode,
        type
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const isValid = otp && !otp.usedAt && otp.expiresAt > new Date()

    if (isValid) {
      return [
        {
          message: 'OTP Code is valid',
          success: true
        },
        null
      ]
    }

    return [
      {
        message: 'OTP Code has expired',
        success: false
      },
      null
    ]
  }
}
