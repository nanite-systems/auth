import { IsNotEmpty, IsUrl } from 'class-validator';

export class RedisConfig {
  /**
   * Connection string for Redis
   */
  @IsUrl()
  @IsNotEmpty()
  redisUrl = process.env.REDIS_URL ?? 'redis://127.0.0.1:6379';
}
