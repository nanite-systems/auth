import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AppConfig } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = await app.resolve(AppConfig);

  process.on('uncaughtException', (err) => {
    const logger = new Logger('UncaughtException');

    logger.error(err, err.stack);
    app.close();
    process.exit(1);
  });

  app.enableShutdownHooks();

  await app.listen(config.port, '0.0.0.0');
}

void bootstrap();
