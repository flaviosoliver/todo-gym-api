import { ParamsDto } from 'src/modules/shared/dtos/params.dto';
import { CreateExerciseDto, ExerciseDto } from '../dtos/dtos';

export const EXERCISES_REPOSITORY = 'EXERCISES_REPOSITORY';

export interface IExercisesRepository {
  create: (exercise: CreateExerciseDto) => Promise<ExerciseDto>;
  getAll: () => Promise<ExerciseDto[]>;
  getById: (id: string) => Promise<ExerciseDto>;
  findByParams: (params: ParamsDto) => Promise<ExerciseDto[]>;
  update: (id: string, exercise: ExerciseDto) => Promise<void>;
}
