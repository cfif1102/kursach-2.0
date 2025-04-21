import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ContractDto } from './dto/contract.dto';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@ApiTags('Contract')
@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get(':id')
  @ApiOkResponse({ type: ContractDto })
  findOne(@Param('id') id: number) {
    return this.contractService.findOne(id);
  }

  @Get()
  @ApiOkResponse({ type: [ContractDto] })
  findMany() {
    return this.contractService.findMany();
  }

  @Post()
  @ApiCreatedResponse({ type: ContractDto })
  create(@Body() dto: CreateContractDto) {
    return this.contractService.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ContractDto })
  update(@Body() dto: UpdateContractDto, @Param('id') id: number) {
    return this.contractService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.contractService.delete(id);
  }
}
