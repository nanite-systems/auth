import { Injectable, Logger } from '@nestjs/common';
import { Axios } from 'axios';
import { hash } from 'bcryptjs';
import IORedis from 'ioredis';
import { AuthConfig } from '../auth.config';
import { ValidationResponse } from '../entities/validation-response.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('Auth');

  constructor(
    private readonly http: Axios,
    private readonly redis: IORedis,
    private readonly config: AuthConfig,
  ) {}

  validateServiceId(serviceId: string): boolean {
    if (!serviceId.startsWith('s:')) return false;

    return /^[a-z0-9]+$/i.test(serviceId.slice(2)) && serviceId != 's:example';
  }

  async checkServiceId(serviceId: string): Promise<ValidationResponse> {
    const serviceIdHash = await hash(serviceId, this.config.salt);
    const cachedCheck: boolean | null = JSON.parse(
      await this.redis.get(serviceIdHash),
    );

    if (cachedCheck !== null) {
      return new ValidationResponse(cachedCheck, serviceIdHash);
    }

    const check = await this.checkServiceIdAgainstCensus(serviceId);
    await this.redis.setex(
      serviceIdHash,
      this.config.ttl,
      JSON.stringify(check),
    );

    this.logger.log(`Checked ${serviceIdHash} against Census: ${check}`);

    return new ValidationResponse(check, serviceIdHash);
  }

  private async checkServiceIdAgainstCensus(
    serviceId: string,
  ): Promise<boolean> {
    const { data } = await this.http.get(`/${serviceId}/get/ps2:v2/`);

    return !('error' in JSON.parse(data));
  }
}
