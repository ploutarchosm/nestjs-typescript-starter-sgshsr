import { AppModule } from './application/app.module';
import { useContainer } from 'class-validator';
import { initial } from './apps';

const apps = initial();

apps.forEach((app) => {
  app.run(AppModule as any, (app) =>
    useContainer(app.select(AppModule), { fallbackOnErrors: true }),
  );
});
