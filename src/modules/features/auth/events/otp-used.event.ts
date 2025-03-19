import { IEvent } from '@nestjs/cqrs'

export class OtpUsedEvent implements IEvent {
  constructor(
    public readonly otpCode: string,
    public readonly email: string
  ) {}
}
