import { Module, Global } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'

import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'

// Modules
import { AuthModule } from './modules/features/auth/auth.module'
import { UserModule } from './modules/features/user/user.module'
import { CoreModule } from './modules/core/core.module'

// Mark CqrsModule as global
@Global()
@Module({
  imports: [CqrsModule],
  exports: [CqrsModule]
})
export class GlobalCqrsModule {}

@Module({
  imports: [
    SentryModule.forRoot(),
    GlobalCqrsModule, // Use the global CqrsModule
    CoreModule,
    AuthModule,
    UserModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter
    }
  ]
})
export class AppModule {}
