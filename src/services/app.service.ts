import { Injectable, NotFoundException } from '@nestjs/common';
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
  async data(domain: string) {
    const data = await this.db
      .getCollection()
      .find((app) => app.domain === domain);
    console.log(data);
    if (data) {
      return data;
    }
  }
}
