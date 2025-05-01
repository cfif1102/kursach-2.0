import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsNumber, ValidateNested } from 'class-validator';

export class EqActDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  id: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  amount: number;
}

export class CreateActDto {
  @ApiProperty({ type: [EqActDto] })
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EqActDto)
  equipments: EqActDto[];

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  objectId: number;
}
