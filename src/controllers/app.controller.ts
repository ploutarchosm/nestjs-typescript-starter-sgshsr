import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root(@Req() req: Request) {
    const domain = req['applicationDomain'];
    return { domain };
  }
}
