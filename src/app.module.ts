import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@census-reworked/nestjs-utils';
import { AppConfig } from './app.config';

@Module({
  imports: [ConfigModule.forFeature([AppConfig]), AuthModule],
})
export class AppModule {}
