// NestJS
import { Module } from '@nestjs/common'

// Services
import { MailService } from './mail.service'

// Handlers
import { SendEmailHandler } from './commands/handlers/send-email.handler'

@Module({
  providers: [MailService, SendEmailHandler]
})
export class MailModule {}
