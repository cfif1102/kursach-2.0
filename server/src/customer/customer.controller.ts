import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CustomerDto } from './dto/customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Serialize } from 'src/common/decorators/serialize.decorator';
import { CustomerPaginatedDto } from './dto/customer-paginated.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('Customer')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOkResponse({ type: [CustomerPaginatedDto] })
  findMany(@Query() paginationDto: PaginationDto) {
    return this.customerService.findMany(paginationDto);
  }

  @Get(':id')
  @Serialize(CustomerDto)
  @ApiOkResponse({ type: CustomerDto })
  findOne(@Param('id') id: number) {
    return this.customerService.findOne(id);
  }

  @Post()
  @Serialize(CustomerDto)
  @ApiCreatedResponse({ type: CustomerDto })
  create(@Body() dto: CreateCustomerDto) {
    return this.customerService.create(dto);
  }

  @Patch(':id')
  @Serialize(CustomerDto)
  @ApiOkResponse({ type: CustomerDto })
  update(@Param('id') id: number, dto: UpdateCustomerDto) {
    return this.customerService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.customerService.delete(id);
  }
}
