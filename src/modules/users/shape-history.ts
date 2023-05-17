import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ShapeHistoryDocument = ShapeHistory & Document;

@Schema({ _id: false, timestamps: true })
export class ShapeHistory {
  @Prop({ type: Date, required: true })
  age: Date;

  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ type: Number, required: true })
  weight: number;

  @Prop({ type: Number, required: true })
  bmi: number;
}

export const ShapeHistorySchema = SchemaFactory.createForClass(ShapeHistory);
