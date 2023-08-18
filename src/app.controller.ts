import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('documentation')
  async serveDocs(@Res() res: Response) {
    return res.sendFile(path.join(__dirname, '../documentation/index.html'));
  }
}
