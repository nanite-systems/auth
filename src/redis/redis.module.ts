import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@census-reworked/nestjs-utils';
import IORedis from 'ioredis';
import { RedisConfig } from './redis.config';

@Module({
  imports: [ConfigModule.forFeature([RedisConfig])],
  providers: [
    {
      provide: IORedis,
      useFactory: (config: RedisConfig) => new IORedis(config.url),
      inject: [RedisConfig],
    },
  ],
  exports: [IORedis],
})
export class RedisModule {
  private readonly logger = new Logger('Redis');

  constructor(private readonly redis: IORedis) {
    redis.on('error', (err) => {
      this.logger.error(err.toString());

      throw err;
    });
  }
}
