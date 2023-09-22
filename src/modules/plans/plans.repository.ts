import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Plan, PlanDocument } from './plan.model';
import { PlanDto, CreatePlanDto } from './dtos/dtos';
import { IPlansRepository } from './interfaces/plans.repository.interface';
import { ParamsDto } from '../shared/dtos/params.dto';
import { TrainingDto } from '../shared/dtos/training.dto';
import {
  exerciseDataPipeline,
  plansByParamsPipeline,
} from './pipelines/exercise-data.pipeline';

@Injectable()
export class PlansRepository implements IPlansRepository {
  constructor(
    @InjectModel(Plan.name)
    readonly model: Model<PlanDocument>
  ) {}

  async getAll(userId: string): Promise<PlanDto[]> {
    const pipeline = exerciseDataPipeline('userId', userId);
    const result = await this.model
      .aggregate<PlanDto>(pipeline)
      .allowDiskUse(false)
      .sort({ name: 1 });

    return result;
  }

  async getById(id: string): Promise<PlanDto> {
    const pipeline = exerciseDataPipeline('_id', id);
    const result = await this.model
      .aggregate<PlanDto>(pipeline)
      .allowDiskUse(false);

    return result[0];
  }

  async findByParams(params: ParamsDto): Promise<PlanDto[]> {
    const pipeline = plansByParamsPipeline(params);
    const result = await this.model
      .aggregate<PlanDto>(pipeline)
      .allowDiskUse(false)
      .sort({ name: 1 });

    return result;
  }

  async create(plan: CreatePlanDto): Promise<PlanDto> {
    return await this.model.create(plan);
  }

  async update(id: string, plan: PlanDto): Promise<void> {
    await this.model.updateOne({ _id: id }, plan);
  }

  async savePlan(plan: Plan): Promise<Plan> {
    return this.model.findByIdAndUpdate(plan.id, plan, { new: true });
  }

  async getPlanByExerciseId(filter: any): Promise<PlanDto[]> {
    return await this.model.findOne(filter);
  }

  async addExercise(
    planId: string,
    training: TrainingDto,
    userId: string
  ): Promise<void> {
    await this.model.updateOne({
      $and: [
        {
          _id: planId,
          userId: userId,
        },
      ],
      $push: {
        training: training,
      },
    });
  }

  async updateExerciseDoneStatus(filter: any): Promise<void> {
    await this.model.updateOne(filter, {
      $set: {
        'training.$.done': true,
      },
    });
  }

  //removeExercise()
}
