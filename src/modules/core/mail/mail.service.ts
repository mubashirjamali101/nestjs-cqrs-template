// Nest JS
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// node mailer
import * as nodemailer from 'nodemailer'

// Types
import { MailOptions } from './types'

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter
  private readonly logger = new Logger(MailService.name)

  constructor(private readonly configService: ConfigService) {
    const user = this.configService.get<string>('smtp.email')
    const pass = this.configService.get<string>('smtp.password')

    if (!user || !pass) throw new Error('SMTP credentials not found')

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    })
  }

  async sendMail(mailOptions: MailOptions) {
    if (!mailOptions.from) mailOptions.from = this.configService.get<string>('smtp.email')

    try {
      await this.transporter.sendMail({
        ...mailOptions
      })
      this.logger.log(`Email sent to "${mailOptions.to}" successfully`)
    } catch (error) {
      this.logger.error('Error sending email', error)
    }
  }
}
