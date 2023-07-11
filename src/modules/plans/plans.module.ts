import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, PlanSchema } from './plan.model';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { PlansRepository } from './plans.repository';
import { PLANS_SERVICE } from './interfaces/plans.service.interface';
import { PLANS_REPOSITORY } from './interfaces/plans.repository.interface';
import { ExercisesModule } from '../exercises/exercises.module';
import { ExercisesService } from '../exercises/exercises.service';
import { EXERCISES_SERVICE } from '../exercises/interfaces/exercises.service.interface';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Plan.name,
        schema: PlanSchema,
      },
    ]),
    ExercisesModule,
    SharedModule,
  ],
  controllers: [PlansController],
  providers: [
    { useClass: PlansService, provide: PLANS_SERVICE },
    { useClass: PlansRepository, provide: PLANS_REPOSITORY },
    { useClass: ExercisesService, provide: EXERCISES_SERVICE },
  ],
})
export class PlansModule {}
