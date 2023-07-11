import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsMongoId, IsOptional } from 'class-validator';
import { TrainingUpdateDto } from 'src/modules/shared/dtos/update-training.dto';

export class UpdatePlanDto {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  focusMuscle?: string[];

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  @IsString()
  userId?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  training?: [TrainingUpdateDto];
}
