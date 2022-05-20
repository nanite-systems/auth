import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthConfig } from './auth.config';
import { ConfigModule } from '@census-reworked/nestjs-utils';

@Module({
  imports: [ConfigModule.forFeature([AuthConfig]), HttpModule, RedisModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
