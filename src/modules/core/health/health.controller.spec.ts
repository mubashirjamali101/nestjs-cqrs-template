import { beforeAll, describe, expect, it } from 'vitest'
import { HealthController } from './health.controller'
import { HttpException } from '@nestjs/common'

describe('HealthController', () => {
  let healthController: HealthController

  beforeAll(() => {
    healthController = new HealthController()
  })

  it('should be defined', () => {
    expect(healthController).toBeDefined()
  })

  it('should return "OK"', () => {
    expect(healthController.healthCheck()).toStrictEqual(new HttpException('OK', 200))
  })
})
