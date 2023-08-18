import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsJWT,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';
import { RefreshTokenDto } from './refresh-token.dto';

export class AuthDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsJWT()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsObject()
  refreshToken: RefreshTokenDto;
}
