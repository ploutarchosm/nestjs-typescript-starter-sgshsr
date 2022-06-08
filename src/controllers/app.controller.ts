import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApplicationService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private service: ApplicationService) {}
  @Get()
  @Render('index')
  root(@Req() req: Request) {
    const domain = req['applicationDomain'];
    return { domain };
  }
}
