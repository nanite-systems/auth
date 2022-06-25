import { IsIn, IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ProcessEnv } from '@census-reworked/nestjs-utils';
import { LogLevel } from '@nestjs/common';

export class AppConfig {
  @ProcessEnv('APP_PORT')
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(65535)
  @Transform(({ value }) => parseInt(value, 10))
  port = 3000;

  @ProcessEnv('LOG_LEVELS')
  @IsIn(['verbose', 'debug', 'log', 'warn', 'error'], { each: true })
  @Transform(({ value }) => value?.split(','))
  logLevels: LogLevel[] = ['log', 'warn', 'error'];
}
