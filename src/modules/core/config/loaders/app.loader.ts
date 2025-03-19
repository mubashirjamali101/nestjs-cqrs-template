import { registerAs } from '@nestjs/config'
import { Logger } from '@nestjs/common'

export default registerAs('app', () => {
  const config = {
    timezone: process.env.TZ || 'UTC',
    environment: process.env.NODE_ENV as 'development' | 'production',
    port: process.env.PORT,
    pasetoPrivateKey: process.env.PASETO_PRIVATE_KEY,
    pasetoPublicKey: process.env.PASETO_PUBLIC_KEY,
    dataBaseUrl: process.env.DATABASE_URL,
    sentryDsn: process.env.SENTRY_DSN
  }

  Logger.log(`APP CONFIG:
Environment: ${config.environment}
Port: ${config.port}
Timezone: ${config.timezone}
    `)

  return config
})
