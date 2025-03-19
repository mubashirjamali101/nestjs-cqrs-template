import { IEvent } from '@nestjs/cqrs'
import { User } from '@prisma/client'

/**
 * Fired when a user reset their password
 */
export class PasswordResetEvent implements IEvent {
  constructor(public readonly user: Partial<User>) {}
}
