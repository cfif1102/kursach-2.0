import { Licensee } from '@licensee/entities/licensee.entity';
import { LicenseeDto } from './licensee.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedDto } from 'src/common/dto/paginated.dto';

export class LicenseePaginatedDto extends PaginatedDto<LicenseeDto, Licensee> {
  @ApiProperty({ type: () => [LicenseeDto] })
  @Type(() => LicenseeDto)
  @Expose()
  declare items: LicenseeDto[];

  constructor(items: Licensee[], count: number, paginationDto: PaginationDto) {
    super(LicenseeDto, items, count, paginationDto);
  }
}
