import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShapeHistory, ShapeHistorySchema } from './shape-history';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User {
  id: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: Date, required: true })
  birthDate: Date;

  @Prop({ type: Boolean, required: true })
  active: boolean;

  @Prop({ type: [ShapeHistorySchema], required: true })
  shape: ShapeHistory[];
}

export const UserSchema = SchemaFactory.createForClass(User);
