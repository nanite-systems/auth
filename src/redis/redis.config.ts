import { IsNotEmpty, IsUrl } from 'class-validator';
import { ProcessEnv } from '@census-reworked/nestjs-utils';

export class RedisConfig {
  /**
   * Connection string for Redis
   */
  @ProcessEnv('REDIS_URL')
  @IsUrl()
  @IsNotEmpty()
  @IsUrl({})
  url = 'redis://127.0.0.1:6379';
}
