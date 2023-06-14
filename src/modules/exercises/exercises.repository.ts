import { Injectable } from '@nestjs/common';
import { IExercisesRepository } from './interfaces/exercises.repository.interface';
import { Exercise, ExerciseDocument } from './exercise.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExerciseDto, ExerciseDto } from './dtos/dtos';
import { ParamsDto } from '../shared/dtos/params.dto';

@Injectable()
export class ExercisesRepository implements IExercisesRepository {
  constructor(
    @InjectModel(Exercise.name)
    readonly model: Model<ExerciseDocument>
  ) {}

  async create(exercise: CreateExerciseDto): Promise<ExerciseDto> {
    return await this.model.create(exercise);
  }

  async getAll(): Promise<ExerciseDto[]> {
    return await this.model.find();
  }

  async getById(id: string): Promise<ExerciseDto> {
    return await this.model.findById(id);
  }

  async findByParams(params: ParamsDto): Promise<ExerciseDto[]> {
    return await this.model.find(params);
  }

  async update(id: string, exercise: ExerciseDto): Promise<void> {
    await this.model.updateOne({ _id: id }, exercise);
  }
}
