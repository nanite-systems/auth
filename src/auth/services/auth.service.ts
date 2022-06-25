import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';
import { hash } from 'bcryptjs';
import IORedis from 'ioredis';
import { AuthConfig } from '../auth.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly http: Axios,
    private readonly redis: IORedis,
    private readonly config: AuthConfig,
  ) {}

  async checkServiceId(serviceId: string): Promise<boolean> {
    const { data } = await this.http.get(`/${serviceId}/get/ps2:v2/`);

    return !('error' in JSON.parse(data));
  }

  async checkServiceIdCached(serviceId: string): Promise<boolean> {
    const serviceIdHash = await hash(serviceId, this.config.salt);
    const cachedCheck: boolean = JSON.parse(
      await this.redis.get(serviceIdHash),
    );

    if (cachedCheck !== undefined) {
      return cachedCheck;
    }

    const check = await this.checkServiceId(serviceId);
    await this.redis.setex(
      serviceIdHash,
      this.config.ttl,
      JSON.stringify(check),
    );

    if (!check) return false;
  }
}
