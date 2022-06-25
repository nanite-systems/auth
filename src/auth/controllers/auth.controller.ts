import { Controller, Get, Headers, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { validateServiceId } from '../utils/service-id.helpers';
import { FastifyReply } from 'fastify';

@Controller()
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('/auth')
  async authenticate(
    @Res() response: FastifyReply,
    @Headers('X-Forwarded-Uri') url?: string,
  ) {
    const serviceId = this.extractServiceId(url);

    console.log(url, serviceId);

    const check =
      serviceId &&
      validateServiceId(serviceId) &&
      (await this.auth.checkServiceIdCached(serviceId));

    if (check) response.code(HttpStatus.OK).send();
    else response.code(HttpStatus.FORBIDDEN).send('403 Forbidden');
  }

  private extractServiceId(url?: string): string | null {
    const i = url?.indexOf('?');
    if (!i || i < 0) return null;

    const params = new URLSearchParams(url.slice(i));

    return params.get('service-id');
  }
}
