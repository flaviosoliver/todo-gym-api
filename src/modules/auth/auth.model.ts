import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ collection: 'auth', timestamps: true })
export class Auth {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  token: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
