import { Request } from 'express';
import { TrainingDto } from 'src/modules/shared/dtos/training.dto';
import { CreatePlanDto, PlanDto } from '../dtos/dtos';
import { Plan } from '../plan.model';
import { ParamsDto } from 'src/modules/shared/dtos/params.dto';

export const PLANS_CONTROLLER = 'PLANS_CONTROLLER';

export interface IPlansController {
  getAll: (request: Request) => Promise<Plan[]>;
  findByParams: (request: Request, params?: ParamsDto) => Promise<PlanDto[]>;
  getById: (id: string) => Promise<PlanDto>;
  create: (plan: CreatePlanDto, request: Request) => Promise<Plan>;
  update: (id: string, plan: PlanDto, request: Request) => Promise<void>;
  addOrUpdateTraining: (
    id: string,
    request: Request,
    trainingData: TrainingDto[]
  ) => Promise<PlanDto>;
  updateExerciseDoneStatus: (
    id: string,
    request: Request,
    exerciseId: string
  ) => Promise<void>;
}
