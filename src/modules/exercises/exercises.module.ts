import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { Exercise, ExerciseSchema } from './exercise.model';
import { MongooseModule } from '@nestjs/mongoose';
import { EXERCISES_SERVICE } from './interfaces/exercises.service.interface';
import { EXERCISES_REPOSITORY } from './interfaces/exercises.repository.interface';
import { ExercisesRepository } from './exercises.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Exercise.name,
        schema: ExerciseSchema,
      },
    ]),
  ],
  controllers: [ExercisesController],
  providers: [
    { useClass: ExercisesService, provide: EXERCISES_SERVICE },
    { useClass: ExercisesRepository, provide: EXERCISES_REPOSITORY },
  ],
  exports: [EXERCISES_SERVICE, EXERCISES_REPOSITORY],
})
export class ExercisesModule {}
