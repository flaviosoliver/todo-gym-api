import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsMongoId,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Training } from 'src/modules/shared/models/training.model';

export class CreatePlanDto {
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
  @IsOptional()
  @IsDate()
  expiresIn?: Date;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  training?: [Training];
}
