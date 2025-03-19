import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

// Services
import { MailService } from '../../mail.service'

// Commands
import { SendEmailCommand } from '../send-email.command'

// Templates
import MailTemplates, { generateEmailContent } from '../../templates'

// Types
import { Result } from 'src/types/common.types'

@CommandHandler(SendEmailCommand)
export class SendEmailHandler implements ICommandHandler<SendEmailCommand<keyof MailTemplates>> {
  constructor(private readonly mailService: MailService) {}

  async execute(
    command: SendEmailCommand<keyof MailTemplates>
  ): Promise<Result<{ success: boolean }>> {
    const { to, subject, data, template } = command.data

    const [content, errGeneratingContent] = generateEmailContent(template, data)

    if (errGeneratingContent) {
      return [null, errGeneratingContent]
    }

    try {
      await this.mailService.sendMail({
        to,
        subject,
        html: content
      })

      return [{ success: true }, null]
    } catch (err) {
      return [null, err]
    }
  }
}
