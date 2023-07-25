import { PlanDto } from '../dtos/dtos';
import { Plan } from '../plan.model';

export const mapPlan = (plan: Plan): PlanDto => {
  return <PlanDto>{
    id: plan.id,
    name: plan.name,
    focusMuscle: plan.focusMuscle,
    expiresIn: plan.expiresIn,
    userId: plan.userId,
    training: plan.training,
  };
};
