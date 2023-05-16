import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
