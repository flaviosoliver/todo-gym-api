import { ParamsDto } from 'src/modules/shared/dtos/params.dto';
import { PlanDto, CreatePlanDto, UpdatePlanDto } from '../dtos/dtos';
import { Plan } from '../plan.model';

export const PLANS_REPOSITORY = 'PLANS_REPOSITORY';

export interface IPlansRepository {
  getAll: () => Promise<PlanDto[]>;
  getById: (id: string) => Promise<PlanDto>;
  findByParams: (params?: ParamsDto) => Promise<PlanDto[]>;
  create: (plan: CreatePlanDto) => Promise<PlanDto>;
  update: (id: string, plan: PlanDto) => Promise<void>;
  getPlanByExerciseId: (
    exerciseId: string,
    userId: string
  ) => Promise<PlanDto[]>;
  savePlan: (plan: Plan) => Promise<Plan>;
}
