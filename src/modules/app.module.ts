import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { PlansModule } from './plans/plans.module';
import { RoutinesModule } from './routines/routines.module';
import { ExercisesModule } from './exercises/exercises.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PlansModule, RoutinesModule, ExercisesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
