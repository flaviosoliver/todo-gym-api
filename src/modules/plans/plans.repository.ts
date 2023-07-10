import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Plan, PlanDocument } from './plan.model';
import { PlanDto, CreatePlanDto } from './dtos/dtos';
import { IPlansRepository } from './interfaces/plans.repository.interface';
import { ParamsDto } from '../shared/dtos/params.dto';
import { TrainingDto } from '../shared/dtos/training.dto';

@Injectable()
export class PlansRepository implements IPlansRepository {
  constructor(
    @InjectModel(Plan.name)
    readonly model: Model<PlanDocument>
  ) {}

  async getAll(): Promise<PlanDto[]> {
    return await this.model.find();
  }

  async getById(id: string): Promise<PlanDto> {
    return await this.model.findById(id);
  }

  async findByParams(params: ParamsDto): Promise<PlanDto[]> {
    return await this.model.find(params);
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
