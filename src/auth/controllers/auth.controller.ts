import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { validateServiceId } from '../utils/service-id.helpers';
import { hash } from 'bcrypt';
import { Redis } from 'ioredis';
import { AuthConfig } from '../auth.config';
import { REDIS } from '../../redis/constants';

@Controller()
export class AuthController {
  constructor(
    @Inject(REDIS)
    private readonly redis: Redis,
    private readonly config: AuthConfig,
    private readonly auth: AuthService,
  ) {}

  @Get('/auth')
  @HttpCode(HttpStatus.OK)
  async authenticate(@Query('service-id') serviceId: string) {
    if (!validateServiceId(serviceId)) throw new UnauthorizedException();

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
