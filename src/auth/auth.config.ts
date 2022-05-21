import { Transform } from 'class-transformer';
import { ProcessEnv } from '@census-reworked/nestjs-utils';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class AuthConfig {
  /**
   * Salt used to hash service ids
   */
  @ProcessEnv('AUTH_SALT')
  @IsString()
  salt: string;

  /**
   * Time that a validated service id is cached
   */
  @ProcessEnv('AUTH_EXPIRE')
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  ttl = 3 * 24 * 3600;
}
