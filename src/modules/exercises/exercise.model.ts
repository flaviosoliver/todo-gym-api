import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ExerciseDocument = Exercise & Document;

@Schema({ collection: 'exercises', timestamps: true })
export class Exercise {
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  focusMuscle: string[];

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  video: string;

  @Prop({ type: String, required: true })
  load: string;

  @Prop({ type: String, required: true })
  notes: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
