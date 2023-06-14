import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  EXERCISES_REPOSITORY,
  IExercisesRepository,
} from './interfaces/exercises.repository.interface';
import { CreateExerciseDto, ExerciseDto } from './dtos/dtos';
import { mapExercise } from './utils/exercise.mapper';
import { IExercisesService } from './interfaces/exercises.service.interface';
import { validate } from 'class-validator';
import { ParamsDto } from '../shared/dtos/params.dto';
import { buildParams } from '../shared/utils/build-params.utils';

@Injectable()
export class ExercisesService implements IExercisesService {
  private readonly logger = new Logger('exercises');

  constructor(
    @Inject(EXERCISES_REPOSITORY)
    private readonly repository: IExercisesRepository
  ) {}

  async getAll(): Promise<ExerciseDto[]> {
    try {
      return await this.repository.getAll();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findByParams(params?: ParamsDto): Promise<ExerciseDto[]> {
    try {
      const parameters = buildParams(params);
      let exercises = await this.repository.findByParams(parameters);
      if (exercises && exercises.length > 0) {
        return exercises.map((exe) => mapExercise(exe));
      } else {
        return (exercises = []);
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Invalid exercise params`);
    }
  }

  async getById(id: string): Promise<ExerciseDto> {
    try {
      const exercise = await this.repository.getById(id);
      if (exercise != null || exercise != undefined) {
        return mapExercise(exercise);
      } else {
        throw new NotFoundException(`Id ${id} not found`);
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Invalid id ${id}`);
    }
  }

  async create(exercise: CreateExerciseDto): Promise<ExerciseDto> {
    try {
      const errors = await validate(exercise);
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
      return await this.repository.create(exercise);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error);
        throw new BadRequestException(error.message);
      }
    }
  }

  async update(id: string, exercise: ExerciseDto): Promise<void> {
    try {
      const result = await this.repository.getById(id);
      if (result !== undefined) {
        return await this.repository.update(id, exercise);
      } else {
        throw new NotFoundException(`Exercise id ${id} not found`);
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Update exercise id ${id} failed`);
    }
  }
}
