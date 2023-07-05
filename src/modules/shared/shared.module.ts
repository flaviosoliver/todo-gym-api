import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Training, TrainingSchema } from './models/training.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Training.name,
        schema: TrainingSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SharedModule {}
