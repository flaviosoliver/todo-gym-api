import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TrainingUpdateDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  @IsString()
  exerciseId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  series?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  repetitions?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  load?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
