import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [RoutinesController],
  providers: [RoutinesService],
})
export class RoutinesModule {}
