import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class SearchCustomerDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  name: string;
}
