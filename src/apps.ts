import { Application } from './application/app';
import * as join from 'path';

const ApplicationList = [
  {
    ApplicationName: 'website1',
  },
  {
    ApplicationName: 'website2',
  },
];

export const initial = () => {
  return ApplicationList.map(
    (app) =>
      new Application(
        join.resolve(__dirname, '..', 'src', 'websites', app.ApplicationName),
        app.ApplicationName,
      ),
  );
};
