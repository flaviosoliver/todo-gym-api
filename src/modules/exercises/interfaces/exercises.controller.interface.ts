import { ParamsDto } from 'src/modules/shared/dtos/params.dto';
import { CreateExerciseDto, ExerciseDto } from '../dtos/dtos';
import { Exercise } from '../exercise.model';

export const EXERCISES_CONTROLLER = 'EXERCISES_CONTROLLER';

export interface IExercisesController {
  getAll: () => Promise<Exercise[]>;
  getById: (id: string) => Promise<ExerciseDto>;
  findByParams: (params?: ParamsDto) => Promise<ExerciseDto[]>;
  create: (exercise: CreateExerciseDto) => Promise<Exercise>;
  update: (id: string, exercise: ExerciseDto) => Promise<void>;
}
