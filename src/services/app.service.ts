import { Injectable } from '@nestjs/common';
import * as FakeDb from 'fake-db';

@Injectable()
export class ApplicationService {
  private db: any;
  constructor() {
    this.db = new FakeDb([
      { domain: 'website1.com', settings: {} },
      { domain: 'website2.com', settings: {} },
    ]);
  }
  setting(name: string) {
    return this.db.getCollection().then((collection) => {
      res.json(collection);
    });
  }
}
