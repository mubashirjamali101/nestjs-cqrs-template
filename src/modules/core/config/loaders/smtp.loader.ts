import { registerAs } from '@nestjs/config'
import { Logger } from '@nestjs/common'

export default registerAs('smtp', () => {
  const config = {
    email: process.env.SMTP_EMAIL,
    password: process.env.SMTP_PASSWORD
  }

  Logger.log(`SMTP CONFIG:
Email: ${config.email}
Password (length): ${config.password?.length || 'N/A'}
    `)

  return config
})
