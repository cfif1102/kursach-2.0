import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateContractDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  contractNumber: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  customerId: number;
}
