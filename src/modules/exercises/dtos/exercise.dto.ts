import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class ExerciseDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  focusMuscle: string[];

  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsOptional()
  video?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  notes?: string;
}
