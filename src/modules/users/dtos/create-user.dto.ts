import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ShapeHistoryDto } from './shape-history.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  lastName: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @IsDefined()
  birthDate: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  shape: ShapeHistoryDto[];
}
