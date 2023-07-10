import { ParamsDto } from 'src/modules/shared/dtos/params.dto';
import { PlanDto, CreatePlanDto } from '../dtos/dtos';
import { TrainingDto } from 'src/modules/shared/dtos/training.dto';

export const PLANS_SERVICE = 'PLANS_SERVICE';

export interface IPlansService {
  getAll: () => Promise<PlanDto[]>;
  getById: (id: string) => Promise<PlanDto>;
  findByParams: (params?: ParamsDto) => Promise<PlanDto[]>;
  create: (plan: CreatePlanDto) => Promise<PlanDto>;
  update: (id: string, plan: PlanDto) => Promise<void>;
  addOrUpdateTraining: (
    planId: string,
    trainingDto: TrainingDto[]
  ) => Promise<PlanDto>;
  updateExerciseDoneStatus: (
    planId: string,
    exerciseId: string
  ) => Promise<void>;
}
