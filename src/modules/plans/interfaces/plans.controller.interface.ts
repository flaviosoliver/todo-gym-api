import { TrainingDto } from 'src/modules/shared/dtos/training.dto';
import { CreatePlanDto, PlanDto } from '../dtos/dtos';
import { Plan } from '../plan.model';
import { ParamsDto } from 'src/modules/shared/dtos/params.dto';

export const PLANS_CONTROLLER = 'PLANS_CONTROLLER';

export interface IPlansController {
  getAll: () => Promise<Plan[]>;
  findByParams: (params?: ParamsDto) => Promise<PlanDto[]>;
  getById: (id: string) => Promise<PlanDto>;
  create: (plan: CreatePlanDto) => Promise<Plan>;
  update: (id: string, plan: PlanDto) => Promise<void>;
  addOrUpdateTraining: (
    id: string,
    trainingData: TrainingDto[]
  ) => Promise<PlanDto>;
  updateExerciseDoneStatus: (id: string, exerciseId: string) => Promise<void>;
}
