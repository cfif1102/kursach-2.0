import { Customer } from '@customer/entities/customer.entity';
import { CustomerDto } from './customer.dto';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class CustomerPaginatedDto extends PaginatedDto<CustomerDto, Customer> {
  @ApiProperty({ type: () => [CustomerDto] })
  @Type(() => CustomerDto)
  @Expose()
  declare items: CustomerDto[];

  constructor(items: Customer[], count: number, paginationDto: PaginationDto) {
    super(CustomerDto, items, count, paginationDto);
  }
}
