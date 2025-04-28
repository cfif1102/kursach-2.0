import { Equipment } from '@equipment/entities/equipment.entity';
import { EquipmentDto } from './equipment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class EquipmentPaginatedDto extends PaginatedDto<EquipmentDto, Equipment> {
  @ApiProperty({ type: () => [EquipmentDto] })
  @Type(() => EquipmentDto)
  @Expose()
  declare items: EquipmentDto[];

  constructor(items: Equipment[], count: number, paginationDto: PaginationDto) {
    super(EquipmentDto, items, count, paginationDto);
  }
}
