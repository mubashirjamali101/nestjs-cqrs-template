import { Command } from '@nestjs/cqrs'
import MailTemplates from '../templates'
import { Result } from 'src/types/common.types'

export class SendEmailCommand<T extends keyof MailTemplates> extends Command<
  Result<{ success: boolean }>
> {
  constructor(
    public readonly data: {
      to: string
      subject: string
      template: T
      data: MailTemplates[T]
    }
  ) {
    super()
  }
}
