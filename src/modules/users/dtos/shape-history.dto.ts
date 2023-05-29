import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class ShapeHistoryDto {
  @ApiProperty()
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  age: Date;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsDefined()
  @IsNotEmpty()
  height: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsDefined()
  @IsNotEmpty()
  weight: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsDefined()
  @IsNotEmpty()
  bmi: number;
}
