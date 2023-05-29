import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Training, TrainingSchema } from '../shared/models/training.model';

export type RoutineDocument = Routine & Document;

@Schema({ collection: 'routines', timestamps: true })
export class Routine {
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  focusMuscle: string[];

  @Prop({ type: String, required: true })
  frequency: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  })
  userId: string;

  @Prop({ type: [TrainingSchema], required: true })
  training: Training[];
}

export const RoutineSchema = SchemaFactory.createForClass(Routine);
