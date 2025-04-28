import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EquipmentDto } from './dto/equipment.dto';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Serialize } from 'src/common/decorators/serialize.decorator';
import { EquipmentPaginatedDto } from './dto/equipment-paginated.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('Equipment')
@Controller('equipments')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  @ApiOkResponse({ type: [EquipmentPaginatedDto] })
  findMany(@Query() paginationDto: PaginationDto) {
    return this.equipmentService.findMany(paginationDto);
  }

  @Get(':id')
  @Serialize(EquipmentDto)
  @ApiOkResponse({ type: EquipmentDto })
  findOne(@Param('id') id: number) {
    return this.equipmentService.findOne(id);
  }

  @Post()
  @Serialize(EquipmentDto)
  @ApiCreatedResponse({ type: EquipmentDto })
  create(@Body() dto: CreateEquipmentDto) {
    return this.equipmentService.create(dto);
  }

  @Patch(':id')
  @Serialize(EquipmentDto)
  @ApiOkResponse({ type: EquipmentDto })
  update(@Param('id') id: number, dto: UpdateEquipmentDto) {
    return this.equipmentService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.equipmentService.delete(id);
  }
}
