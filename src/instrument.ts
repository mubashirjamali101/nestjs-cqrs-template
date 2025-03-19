import * as dotenv from 'dotenv'
import * as Sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

dotenv.config()

Sentry.init({
  dsn: process.env.SENTRY_DSN, // your Sentry DSN from the Sentry project settings
  integrations: [
    // enable profiling (if you want performance monitoring)
    nodeProfilingIntegration()
  ],
  tracesSampleRate: 1.0, // capture 100% of transactions for performance (adjust in prod)
  profilesSampleRate: 1.0 // capture profiles for 100% of transactions (adjust in prod)
})
