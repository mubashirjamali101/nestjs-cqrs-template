import './instrument' // Initialize Sentry first
import './tracing' // Initialize OpenTelemetry
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'

import { AppModule } from './app.module'
import { APP_NAME, AUTH_HEADER } from './lib/constants'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  app.useGlobalPipes(new ValidationPipe())

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  // Security: Fastify Helmet
  await app.register(fastifyHelmet, { contentSecurityPolicy: false })

  // Security: CORS
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  })

  // Security: Rate Limiting
  const ONE_HUNDRED_REQUESTS = 100
  await app.register(fastifyRateLimit, {
    max: ONE_HUNDRED_REQUESTS,
    timeWindow: '1 minute'
  })

  // Docs: Swagger
  const config = new DocumentBuilder()
    .setTitle(`${APP_NAME} Backend`)
    .setDescription(`${APP_NAME} Backend REST APIs Documentation`)
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, AUTH_HEADER)
    .build()
  const theme = new SwaggerTheme()
  const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    swaggerOptions: {
      persistAuthorization: true
    }
  }

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document, options)

  await app.listen(process.env.PORT || 5000)
}

bootstrap().then().catch(console.error)
