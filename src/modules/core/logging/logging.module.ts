import { Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, context, level, message }) => {
              return `${timestamp as string} [${level}]${context as string} ${message as string}`
            }),
            winston.format.colorize({
              level: true,
              message: true,
              all: true
            })
          )
        }),
        // Example: add file transport for errors
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.json()
        })
      ]
    })
  ]
})
export class LoggingModule {}
