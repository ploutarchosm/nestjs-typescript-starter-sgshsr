import { NestModule } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as csrf from 'csurf';
import { ConfigService } from '@nestjs/config';
import { ApplicationMiddleware } from './app.middleware';
import helmet from 'helmet';

declare type ApplicationConfigurationDelegate = (
  app: NestExpressApplication,
) => void;

export class Application {
  private application: any;
  private path: string;
  private name: string;

  constructor(path: string, name: string) {
    this.path = path;
    this.name = name;
  }

  async run(appModule: NestModule, delegate: ApplicationConfigurationDelegate) {
    this.application = await NestFactory.create<NestExpressApplication>(
      appModule,
    );

    useContainer(this.application.select(appModule), {
      fallback: true,
      fallbackOnErrors: true,
    });

    if (delegate) {
      delegate(this.application);
    }

    const config = this.application.get(ConfigService);
    const appConfig = config.get(this.name);

    // Set Middlewares
    this.application.enableCors();
    // Set helmet only for production
    // this.application.use(
    //   helmet({
    //     contentSecurityPolicy: false,
    //   }),
    // );
    this.application.use(cookieParser(appConfig.websiteConfig));
    this.application.use(csrf({ cookie: true }));
    this.application.use(
      ApplicationMiddleware({ name: this.name, domain: appConfig.domain }),
    );

    // Setup MVC
    this.application.useStaticAssets(this.path + '/public');
    this.application.setBaseViewsDir(this.path + '/views');
    this.application.setViewEngine('hbs');

    // Listen Application
    await this.application.listen(appConfig.port, () => {
      console.log(`Application domain: ` + appConfig.domain);
      console.log(`Started at port: ` + appConfig.port);
    });
  }
}
