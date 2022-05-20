import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import {ProcessEnv} from "@census-reworked/nestjs-utils";

export class AppConfig {
  @ProcessEnv('APP_PORT')
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(65535)
  @Transform(({ value }) => parseInt(value, 10))
  port = 3000;
}
