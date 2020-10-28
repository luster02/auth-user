import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module';

const logger = new Logger('UserMicroservice')

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
    logger: ['debug', 'log']
  })
  await app.listen(() => logger.log('user microservice listening'))
}
bootstrap();