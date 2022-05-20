import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async checkServiceId(serviceId: string): Promise<boolean> {
    const { data } = await firstValueFrom(
      this.http.get(
        `https://census.daybreakgames.com/s:${serviceId}/get/ps2:v2/`,
        { maxRedirects: 0 },
      ),
    );

    return !('error' in data);
  }
}
