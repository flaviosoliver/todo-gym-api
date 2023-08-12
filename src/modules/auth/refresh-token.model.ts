import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class RefreshToken {
  @ApiProperty({ description: 'Refresh token' })
  @Prop({ type: String, require: true })
  refreshToken: string;

  @ApiProperty({ description: 'Refresh token expires in' })
  @Prop({ type: Number, require: true })
  expiresIn: number;
}

export type RefreshTokenDocument = RefreshToken & Document;
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
