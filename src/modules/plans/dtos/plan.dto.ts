import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Training } from 'src/modules/shared/models/training.model';

export class PlanDto {
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
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  focusMuscle: string[];

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  training?: Training[];
}
