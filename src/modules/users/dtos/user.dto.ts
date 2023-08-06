import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ShapeHistory } from '../shape-history';

export class UserDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  shape: ShapeHistory[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar?: string;
}
