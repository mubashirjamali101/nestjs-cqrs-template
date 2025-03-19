import { Global, Module } from '@nestjs/common'

// Modules
import { PrismaModule } from 'src/modules/core/orm/prisma.module'
import { ConfigModule } from './config/config.module'
import { HealthModule } from './health/health.module'
import { LoggingModule } from './logging/logging.module'
import { MailModule } from './mail/mail.module'

@Global()
@Module({
  imports: [ConfigModule, PrismaModule, LoggingModule, HealthModule, MailModule],
  exports: [ConfigModule, PrismaModule, LoggingModule]
})
export class CoreModule {}
