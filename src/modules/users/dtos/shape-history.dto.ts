import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class ShapeHistoryDto {
  @ApiProperty()
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  age: Date;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  height: number;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  weight: number;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  bmi: number;
}
