import { AppModule } from './application/app.module';
import { Application } from './application/app';
import { useContainer } from 'class-validator';
import * as join from 'path';

const website1 = new Application(
    join.resolve(__dirname, '..', 'src', 'websites', 'website1'),
    'website1',
  ),
  website2 = new Application(
    join.resolve(__dirname, '..', 'src', 'websites', 'website2'),
    'website2',
  );

website1.run(AppModule as any, (app) =>
  useContainer(app.select(AppModule), { fallbackOnErrors: true }),
);
website2.run(AppModule as any, (app) =>
  useContainer(app.select(AppModule), { fallbackOnErrors: true }),
);
