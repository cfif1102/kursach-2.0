import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'array',
      items: { type: 'number' },
    },
  })
  @IsArray({ each: true })
  schedule: number[][];

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  facilityId: number;
}
