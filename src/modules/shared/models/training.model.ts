import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export type TrainingDocument = Training & Document;

@Schema({ timestamps: true })
export class Training {
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  exerciseId: string;

  @Prop({ type: String, required: true })
  series: string;

  @Prop({ type: String, required: true })
  repetitions: string;

  @ApiProperty({ description: 'Exercise load/weight' })
  @Prop({ type: String, required: true })
  load: string;

  @Prop({ type: String, required: true })
  notes: string;

  @Prop({ type: Boolean, required: true })
  done: boolean;
}

export const TrainingSchema = SchemaFactory.createForClass(Training);
