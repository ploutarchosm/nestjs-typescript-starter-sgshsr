import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from '../controllers/app.controller';
import { HttpExceptionFilter } from '../services/exception.filter.service';
import { AppConfigModule } from '../config/app.config.module';
import { ApplicationService } from '../services/app.service';

@Module({
  imports: [AppConfigModule],
  controllers: [AppController],
  providers: [
    ApplicationService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
