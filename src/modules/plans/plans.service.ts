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
import { PlanDto, CreatePlanDto } from './dtos/dtos';
import { mapPlan } from './utils/plan.mapper';
import { ParamsDto } from '../shared/dtos/params.dto';
import { Training } from '../shared/models/training.model';
import { TrainingDto } from '../shared/dtos/training.dto';

@Injectable()
export class PlansService implements IPlansService {
  private readonly logger = new Logger('PlansService');

  constructor(
    @Inject(PLANS_REPOSITORY)
    private readonly repository: IPlansRepository
  ) {}

  async getAll(userId: string): Promise<PlanDto[]> {
    try {
      const plan = await this.repository.getAll(userId);
      return plan;
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
      let plans = await this.repository.findByParams(params);
      if (plans && plans.length > 0) {
        const mapper = plans.map((item) => mapPlan(item));
        return mapper;
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

  async update(id: string, plan: PlanDto, userId: string): Promise<void> {
    try {
      const result = await this.repository.getById(id);
      if (result !== undefined && result.userId.toString() === userId) {
        return await this.repository.update(id, plan);
      } else {
        throw new NotFoundException(
          `Plan id ${id} not found or does not belongs to the user ${userId}`
        );
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Update plan id ${id} failed`);
    }
  }

  async addOrUpdateTraining(
    planId: string,
    userId: string,
    trainingDto: TrainingDto[]
  ): Promise<PlanDto> {
    try {
      const plan = await this.repository.getById(planId);
      if (!plan || plan.userId.toString() !== userId) {
        throw new NotFoundException(
          `Plan id ${planId} not found or does not belongs to the user ${userId}`
        );
      }

      const updatedTraining = this.updateTraining(plan.training, trainingDto);
      plan.training = updatedTraining;

      return this.repository.savePlan(plan);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Update plan id ${planId} failed`);
    }
  }

  private updateTraining(
    existingTraining: TrainingDto[],
    updateTraining: TrainingDto[]
  ): Training[] {
    const alteredTraining: TrainingDto[] = [];

    for (const training of updateTraining) {
      const existingTrainingIndex = existingTraining.findIndex(
        (t) => t.exerciseId.toString() === training.exerciseId
      );

      if (existingTrainingIndex !== -1) {
        existingTraining[existingTrainingIndex] = {
          id: training.id,
          exerciseId: training.exerciseId,
          series: training.series,
          repetitions: training.repetitions,
          load: training.load,
          notes: training.notes,
          done: training.done,
        };
      } else {
        alteredTraining.push({
          id: undefined,
          exerciseId: training.exerciseId,
          series: training.series,
          repetitions: training.repetitions,
          load: training.load,
          notes: training.notes,
          done: training.done,
        });
      }
    }

    return [...existingTraining, ...alteredTraining];
  }

  async updateExerciseDoneStatus(
    planId: string,
    userId: string,
    exerciseId: string
  ): Promise<void> {
    try {
      const filter = {
        _id: planId,
        userId: userId,
        training: {
          $elemMatch: {
            exerciseId: exerciseId,
          },
        },
      };

      const plan = await this.repository.getById(planId);

      if (!plan) {
        throw new BadRequestException(
          `Plan id ${planId} not found or does not belongs to the user ${userId}`
        );
      }

      const exerciseExists = await this.repository.getPlanByExerciseId(filter);

      if (!exerciseExists) {
        throw new BadRequestException(
          `Exercise id ${exerciseId} not found or plan does not belongs to the current user`
        );
      }

      for (const training of plan.training) {
        if (training.exerciseId.toString() === exerciseId) {
          await this.repository.updateExerciseDoneStatus(filter);
        }
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        `Update status exercise in plan ${planId} failed`
      );
    }
  }
}
