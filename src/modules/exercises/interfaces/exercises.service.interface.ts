import { ParamsDto } from 'src/modules/shared/dtos/params.dto';
import { CreateExerciseDto, ExerciseDto } from '../dtos/dtos';

export const EXERCISES_SERVICE = 'EXERCISES_SERVICE';

export interface IExercisesService {
  getAll: () => Promise<ExerciseDto[]>;
  getById: (id: string) => Promise<ExerciseDto>;
  findByParams: (params: ParamsDto) => Promise<ExerciseDto[]>;
  create: (exercise: CreateExerciseDto) => Promise<ExerciseDto>;
  update: (id: string, exercise: ExerciseDto) => Promise<void>;
}
