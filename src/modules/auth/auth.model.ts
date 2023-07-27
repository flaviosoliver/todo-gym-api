import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ collection: 'auth', timestamps: true })
export class Auth {
  @ApiProperty({ description: 'User Id}' })
  userId: string;

  @ApiProperty({ description: 'User email' })
  @Prop({ type: String, required: true })
  email: string;

  @ApiProperty({ description: 'User token' })
  @Prop({ type: String, required: true })
  token: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
