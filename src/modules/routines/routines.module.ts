import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';

@Module({
  imports: [],
  controllers: [RoutinesController],
  providers: [RoutinesService],
})
export class RoutinesModule {}
