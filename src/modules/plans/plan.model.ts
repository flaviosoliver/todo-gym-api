import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Training, TrainingSchema } from '../shared/models/training.model';

export type PlanDocument = Plan & Document;

@Schema({ collection: 'plans', timestamps: true })
export class Plan {
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [String], required: true })
  focusMuscle: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  })
  userId: string;

  @Prop({ type: [TrainingSchema], required: true })
  training: Training[];
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
