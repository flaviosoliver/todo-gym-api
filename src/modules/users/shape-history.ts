import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ShapeHistoryDocument = ShapeHistory & Document;

@Schema({ _id: false, timestamps: true })
export class ShapeHistory {
  @ApiProperty({ description: 'User age' })
  @Prop({ type: Date, required: true })
  age: Date;

  @ApiProperty({ description: 'User height' })
  @Prop({ type: Number, required: true })
  height: number;

  @ApiProperty({ description: 'User weight' })
  @Prop({ type: Number, required: true })
  weight: number;

  @ApiProperty({
    description: 'According to registered User data, BMI calculation',
  })
  @Prop({ type: Number, required: true })
  bmi: number;
}

export const ShapeHistorySchema = SchemaFactory.createForClass(ShapeHistory);
