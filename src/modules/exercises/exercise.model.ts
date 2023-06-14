import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ExerciseDocument = Exercise & Document;

@Schema({ collection: 'exercises', timestamps: true })
export class Exercise {
  @ApiProperty({ description: 'Exercise Id' })
  id: string;

  @ApiProperty({ description: 'Exercise Name' })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ description: 'Focus Muscle of Exercise', type: [String] })
  @Prop({ type: [String], required: true })
  focusMuscle: string[];

  @ApiProperty({ description: 'External URL for Exercise Image' })
  @Prop({ type: String, required: false })
  image: string;

  @ApiProperty({ description: 'External URL for Exercise Video' })
  @Prop({ type: String, required: false })
  video: string;

  @ApiProperty({ description: 'Info notes to exercise' })
  @Prop({ type: String, required: false })
  notes: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
