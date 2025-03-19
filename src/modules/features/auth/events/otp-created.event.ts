import { IEvent } from '@nestjs/cqrs'
import { OTPType } from '@prisma/client'

export class OtpCreatedEvent implements IEvent {
  constructor(
    public readonly data: {
      otp: string
      email: string
      type: OTPType
      firstName: string
      lastName: string
    }
  ) {}
}
