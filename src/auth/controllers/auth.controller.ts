import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { validateServiceId } from '../utils/service-id.helpers';
import { FastifyReply } from 'fastify';

@Controller()
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('/auth')
  async authenticate(
    @Res() response: FastifyReply,
    @Query('service-id') serviceId?: string,
  ) {
    const check =
      serviceId &&
      validateServiceId(serviceId) &&
      (await this.auth.checkServiceIdCached(serviceId));

    if (check) response.code(HttpStatus.OK).send();
    else response.code(HttpStatus.FORBIDDEN).send('403 Forbidden');
  }
}
