import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { RefreshToken, RefreshTokenSchema } from './refresh-token.model';

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
  accessToken: string;

  @ApiProperty({ description: 'User refresh token object' })
  @Prop({ type: RefreshTokenSchema, required: true })
  refreshToken: RefreshToken;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

AuthSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

AuthSchema.set('toJSON', {
  virtuals: true,
});
