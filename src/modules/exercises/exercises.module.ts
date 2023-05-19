import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';

@Module({
  imports: [],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
