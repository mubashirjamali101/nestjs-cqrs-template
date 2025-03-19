import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

import appConfigLoader from './loaders/app.loader'
import smtpConfigLoader from './loaders/smtp.loader'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfigLoader, smtpConfigLoader],
      envFilePath: '.env',
      ignoreEnvFile: false
    })
  ]
})
export class ConfigModule {}
