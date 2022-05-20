import { Transform } from 'class-transformer';
import { ProcessEnv } from '@census-reworked/nestjs-utils';

export class AuthConfig {
  /**
   * Salt used to hash service ids
   */
  @ProcessEnv('AUTH_SALT')
  salt = '$2b$04$71Dl7P8yeQa2Iv1f8T9mlO';

  /**
   * Time that a validated service id is cached
   */
  @ProcessEnv('AUTH_EXPIRE')
  @Transform(({ value }) => parseInt(value, 10))
  ttl = 3 * 24 * 3600;
}
