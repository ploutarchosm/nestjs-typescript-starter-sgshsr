import { Application } from './application/app';
import * as join from 'path';
const {
  promises: { readdir },
} = require('fs');

const getDirectories = async (source) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

(async () => {
  const path = join.resolve(__dirname, '..', 'src', 'websites');
  const dir = await getDirectories(path);

  console.log(dir);
})();

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
