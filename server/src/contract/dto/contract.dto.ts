import { CustomerDto } from '@customer/dto/customer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ContractDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  contractNumber: string;

  @ApiProperty()
  @Expose()
  @Type(() => CustomerDto)
  customer: CustomerDto;
}
