import { Contract } from '@contract/entities/contract.entity';
import { ContractDto } from './contract.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ContractPaginatedDto extends PaginatedDto<ContractDto, Contract> {
  @ApiProperty({ type: () => [ContractDto] })
  @Type(() => ContractDto)
  @Expose()
  declare items: ContractDto[];

  constructor(items: Contract[], count: number, paginationDto: PaginationDto) {
    super(ContractDto, items, count, paginationDto);
  }
}
