import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly http: Axios) {}

  async checkServiceId(serviceId: string): Promise<boolean> {
    const { data } = await this.http.get(`/s:${serviceId}/get/ps2:v2/`);

    return !('error' in data);
  }
}
