import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApplicationService {
  constructor(private httpService: HttpService) {}

  data(domain: string) {
    return domain;
  }
}
