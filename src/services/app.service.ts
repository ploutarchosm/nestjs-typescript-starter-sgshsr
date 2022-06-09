import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApplicationService {
  constructor(private configService: ConfigService) {}

  data(domain: string) {
    return this.configService.get(domain);
  }
}
