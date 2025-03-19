import { NodeSDK } from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core'

// Configure auto-instrumentation for Nest (and other node libraries if needed)
const sdk = new NodeSDK({
  instrumentations: [
    getNodeAutoInstrumentations({
      // Auto-instrument HTTP, Fastify, etc. by default
    }),
    new NestInstrumentation() // instrument NestJS framework itself
  ]
  // Optionally, configure trace exporter here (ConsoleExporter, JaegerExporter, OTLP exporter, etc.)
  // For example, to log traces to console (development):
  //   traceExporter: new ConsoleSpanExporter()
})

// Start the SDK (will hook into the global OpenTelemetry APIs)
try {
  sdk.start()
} catch (err) {
  console.error('Error initializing OTel SDK', err)
}
