import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthConfig } from './auth.config';
import { ConfigModule } from '@census-reworked/nestjs-utils';
import { Axios } from 'axios';

@Module({
  imports: [ConfigModule.forFeature([AuthConfig]), RedisModule],
  providers: [
    AuthService,
    {
      provide: Axios,
      useFactory: () =>
        new Axios({
          baseURL: 'https://census.daybreakgames.com',
          maxRedirects: 0,
        }),
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
