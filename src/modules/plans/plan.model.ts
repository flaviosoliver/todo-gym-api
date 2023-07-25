import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Training, TrainingSchema } from '../shared/models/training.model';
import { ApiProperty } from '@nestjs/swagger';

export type PlanDocument = Plan & Document;

@Schema({ collection: 'plans', timestamps: true })
export class Plan {
  @ApiProperty({ description: 'Plan Id}' })
  id: string;

  @ApiProperty({ description: 'Plan Name' })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ description: 'Focus Muscle of Plan', type: [String] })
  @Prop({ type: [String], required: true })
  focusMuscle: string[];

  @ApiProperty({ description: 'Validity of plan' })
  @Prop({ type: Date, required: true })
  expiresIn?: Date;

  @ApiProperty({ description: 'User Id who created the plan' })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  })
  userId: string;

  @ApiProperty({
    description: 'Existing Exercises in the Plan',
    type: [Training],
  })
  @Prop({ type: [TrainingSchema], required: false })
  training?: Training[];
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
