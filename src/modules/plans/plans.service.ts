import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { IPlansService } from './interfaces/plans.service.interface';
import {
  IPlansRepository,
  PLANS_REPOSITORY,
} from './interfaces/plans.repository.interface';
import { PlanDto, CreatePlanDto, UpdatePlanDto } from './dtos/dtos';
import { mapPlan } from './utils/plan.mapper';
import {
  EXERCISES_SERVICE,
  IExercisesService,
} from '../exercises/interfaces/exercises.service.interface';
import { ParamsDto } from '../shared/dtos/params.dto';
import { buildParams } from '../shared/utils/build-params.utils';
import { Training } from '../shared/models/training.model';
import { Plan } from './plan.model';
import { TrainingUpdateDto } from '../shared/dtos/update-training.dto';
import { TrainingDto } from '../shared/dtos/training.dto';
import mongoose, { Mongoose } from 'mongoose';

@Injectable()
export class PlansService implements IPlansService {
  private readonly logger = new Logger('PlansService');

  constructor(
    @Inject(PLANS_REPOSITORY)
    private readonly repository: IPlansRepository,
    @Inject(EXERCISES_SERVICE)
    private readonly plansService: IExercisesService
  ) {}

  async getAll(): Promise<PlanDto[]> {
    try {
      return await this.repository.getAll();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getById(id: string): Promise<PlanDto> {
    try {
      const plan = await this.repository.getById(id);
      if (plan != null || plan !== undefined) {
        return mapPlan(plan);
      } else {
        throw new NotFoundException(`Id ${id} not found`);
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Invalid id ${id}`);
    }
  }

  async findByParams(params?: ParamsDto): Promise<PlanDto[]> {
    try {
      const parameters = buildParams(params);
      let plans = await this.repository.findByParams(parameters);
      if (plans && plans.length > 0) {
        return plans.map((item) => mapPlan(item));
      } else {
        return (plans = []);
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Invalid plan params`);
    }
  }

  async create(plan: CreatePlanDto): Promise<PlanDto> {
    try {
      const errors = await validate(plan);
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
      return await this.repository.create(plan);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error);
        throw new BadRequestException(error.message);
      }
    }
  }

  async update(id: string, plan: PlanDto): Promise<void> {
    try {
      const result = await this.repository.getById(id);
      if (result !== undefined) {
        return await this.repository.update(id, plan);
      } else {
        throw new NotFoundException(`Plan id ${id} not found`);
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Update plan id ${id} failed`);
    }
  }

  async addOrUpdateTraining(
    planId: string,
    trainingDto: TrainingDto[]
  ): Promise<PlanDto> {
    const plan = await this.repository.getById(planId);
    if (!plan) {
      throw new Error('Plano não encontrado');
    }

    const updatedTraining = this.updateTraining(plan.training, trainingDto);
    plan.training = updatedTraining;

    return this.repository.savePlan(plan);
  }

  private updateTraining(
    existingTraining: TrainingDto[],
    newTraining: TrainingDto[]
  ): Training[] {
    const updatedTraining: TrainingDto[] = [...existingTraining];

    for (const training of newTraining) {
      const existingExerciseIndex = updatedTraining.findIndex(
        (item) => item.exerciseId === training.exerciseId
      );

      if (existingExerciseIndex !== -1) {
        updatedTraining.splice(existingExerciseIndex, 1, {
          id: updatedTraining[existingExerciseIndex].id,
          exerciseId: training.exerciseId,
          series: training.series,
          repetitions: training.repetitions,
          load: training.load,
          notes: training.notes,
          done: training.done,
        });
      } else {
        updatedTraining.push({
          id: 'generated-id',
          exerciseId: training.exerciseId,
          series: training.series,
          repetitions: training.repetitions,
          load: training.load,
          notes: training.notes,
          done: training.done,
        });
      }
    }

    return updatedTraining;
  }

  async updateTrainingData(plan: PlanDto): Promise<void> {
    try {
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        `Update training in plan ${plan.id} failed`
      );
    }
  }
}
