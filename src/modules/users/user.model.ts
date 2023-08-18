import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShapeHistory, ShapeHistorySchema } from './shape-history';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @ApiProperty({ description: 'User Id' })
  id: string;

  @ApiProperty({ description: 'User email' })
  @Prop({ type: String, required: true })
  email: string;

  @ApiProperty({
    description: 'User password, it must be 5 characters or more',
  })
  @Prop({ type: String, required: true, minlength: 6 })
  password: string;

  @ApiProperty({ description: 'User first name' })
  @Prop({ type: String, required: true })
  firstName: string;

  @ApiProperty({ description: 'User sur name' })
  @Prop({ type: String, required: true })
  lastName: string;

  @ApiProperty({ description: 'User birth date' })
  @Prop({ type: Date, required: true })
  birthDate: Date;

  @ApiProperty({ description: 'User activation status' })
  @Prop({ type: Boolean, required: true })
  active: boolean;

  @ApiProperty({ description: 'User shape history data', type: [ShapeHistory] })
  @Prop({ type: [ShapeHistorySchema], required: true })
  shape: ShapeHistory[];

  @ApiProperty({ description: 'User avatar' })
  @Prop({ type: String, required: false })
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
