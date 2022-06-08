import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurationYaml from './configuration.yaml';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationYaml],
    }),
  ],
  providers: [ConfigService],
})
export class AppConfigModule {}
