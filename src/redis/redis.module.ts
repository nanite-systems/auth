import { Inject, Logger, Module } from '@nestjs/common';
import IORedis, { Redis } from 'ioredis';
import { RedisConfig } from './redis.config';
import { REDIS } from './constants';
import { ConfigModule } from '@census-reworked/nestjs-utils';

@Module({
  imports: [ConfigModule.forFeature([RedisConfig])],
  providers: [
    {
      provide: REDIS,
      useFactory: (config: RedisConfig) => new IORedis(config.redisUrl),
      inject: [RedisConfig],
    },
  ],
  exports: [REDIS],
})
export class RedisModule {
  private readonly logger = new Logger('Redis');

  constructor(@Inject(REDIS) private readonly redis: Redis) {
    redis.on('error', (err) => {
      this.logger.error(err.toString());

      throw err;
    });
  }
}
