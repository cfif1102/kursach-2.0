import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class SearchEquipmentDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  name: string;
}
