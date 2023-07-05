import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export type TrainingDocument = Training & Document;

@Schema({ timestamps: true })
export class Training {
  @ApiProperty({ description: 'Training Id' })
  id: string;

  @ApiProperty({ description: 'Exercise Id' })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Exercises',
  })
  exerciseId: string;

  @ApiProperty({ description: 'Exercise Series' })
  @Prop({ type: String, required: true })
  series: string;

  @ApiProperty({ description: 'Exercise Repetitions' })
  @Prop({ type: String, required: true })
  repetitions: string;

  @ApiProperty({ description: 'Exercise load/weight' })
  @Prop({ type: String, required: true })
  load: string;

  @ApiProperty({ description: 'Exercise Notes' })
  @Prop({ type: String, required: false })
  notes?: string;

  @ApiProperty({ description: 'Exercise Control Done' })
  @Prop({ type: Boolean, required: true })
  done: boolean;
}

export const TrainingSchema = SchemaFactory.createForClass(Training);
