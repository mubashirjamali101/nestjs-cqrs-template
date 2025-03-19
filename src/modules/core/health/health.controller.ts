import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
// import { generateKeyPairSync } from 'node:crypto'

@Controller('health')
export class HealthController {
  @ApiOperation({ summary: 'Health Check' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Means server is running well!' })
  @Get('/')
  healthCheck() {
    return new HttpException('OK', HttpStatus.OK)
  }

  // Uncomment and run this to generate secrect keys for Paseto
  // @ApiOperation({
  //   summary: 'Generate ed25519 Keys',
  //   description: 'Used to sign and verify paseto auth tokens'
  // })
  // @ApiResponse({ status: HttpStatus.OK, description: 'Generate keys' })
  // @Get('/generate-ed25519-keys')
  // generateKeys() {
  //   const { privateKey, publicKey } = generateKeyPairSync('ed25519', {
  //     privateKeyEncoding: {
  //       type: 'pkcs8', // Use PKCS#8 for private key encoding
  //       format: 'pem'
  //     },
  //     publicKeyEncoding: {
  //       type: 'spki', // Use SPKI for public key encoding
  //       format: 'pem'
  //     }
  //   })

  //   return {
  //     privateKey,
  //     publicKey
  //   }
  // }
}
