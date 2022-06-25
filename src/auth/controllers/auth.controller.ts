import {
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { validateServiceId } from '../utils/service-id.helpers';
import { hash } from 'bcrypt';
import IORedis from 'ioredis';
import { AuthConfig } from '../auth.config';

@Controller()
export class AuthController {
  constructor(
    private readonly redis: IORedis,
    private readonly config: AuthConfig,
    private readonly auth: AuthService,
  ) {}

  @Get('/auth')
  @HttpCode(HttpStatus.OK)
  async authenticate(@Query('service-id') serviceId: string) {
    if (!validateServiceId(serviceId))
      throw new ForbiddenException('403 Forbidden');

    const serviceIdHash = await hash(serviceId, this.config.salt);
    const cachedCheck: boolean = JSON.parse(
      await this.redis.get(serviceIdHash),
    );

    if (cachedCheck === true) {
      return;
    } else if (cachedCheck === false) {
      throw new UnauthorizedException('Invalid service id');
    }

    const check = await this.auth.checkServiceId(serviceId);
    await this.redis.setex(
      serviceIdHash,
      this.config.ttl,
      JSON.stringify(check),
    );

    if (!check) throw new UnauthorizedException();
  }
}
