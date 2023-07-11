import { ParamsDto } from 'src/modules/shared/dtos/params.dto';
import { PlanDto, CreatePlanDto } from '../dtos/dtos';
import { TrainingDto } from 'src/modules/shared/dtos/training.dto';

export const PLANS_SERVICE = 'PLANS_SERVICE';

export interface IPlansService {
  getAll: (userId: string) => Promise<PlanDto[]>;
  getById: (id: string) => Promise<PlanDto>;
  findByParams: (params?: ParamsDto) => Promise<PlanDto[]>;
  create: (plan: CreatePlanDto) => Promise<PlanDto>;
  update: (id: string, plan: PlanDto, userId: string) => Promise<void>;
  addOrUpdateTraining: (
    planId: string,
    userId: string,
    trainingDto: TrainingDto[]
  ) => Promise<PlanDto>;
  updateExerciseDoneStatus: (
    planId: string,
    userId: string,
    exerciseId: string
  ) => Promise<void>;
}
