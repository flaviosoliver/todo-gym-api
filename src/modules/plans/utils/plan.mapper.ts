import { PlanDto } from '../dtos/dtos';
import { Plan } from '../plan.model';

export const mapPlan = (plan: Plan): PlanDto => {
  return <PlanDto>{
    id: plan.id,
    name: plan.name,
    focusMuscle: plan.focusMuscle,
    userId: plan.userId,
    training: plan.training,
  };
};
