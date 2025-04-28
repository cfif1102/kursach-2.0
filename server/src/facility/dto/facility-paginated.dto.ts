import { Facility } from '@facility/entities/facility.entity';
import { FacilityDto } from './facility.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class FacilityPaginatedDto extends PaginatedDto<FacilityDto, Facility> {
  @ApiProperty({ type: () => [FacilityDto] })
  @Type(() => FacilityDto)
  @Expose()
  declare items: FacilityDto[];

  constructor(items: Facility[], count: number, paginationDto: PaginationDto) {
    super(FacilityDto, items, count, paginationDto);
  }
}
