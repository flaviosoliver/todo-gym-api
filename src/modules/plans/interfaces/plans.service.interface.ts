import { ParamsDto } from 'src/modules/shared/dtos/params.dto';
import { PlanDto, CreatePlanDto, UpdatePlanDto } from '../dtos/dtos';
import { TrainingUpdateDto } from 'src/modules/shared/dtos/update-training.dto';
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
}
