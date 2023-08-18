import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
export class TrainingDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  exerciseId: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  series: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  repetitions: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  load: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  done: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name?;

  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsOptional()
  image?;

  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsOptional()
  video?;
}
