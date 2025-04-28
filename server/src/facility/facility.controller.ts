import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FacilityDto } from './dto/facility.dto';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { Serialize } from 'src/common/decorators/serialize.decorator';
import { FacilityPaginatedDto } from './dto/facility-paginated.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('Facility')
@Controller('facilities')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Get(':id')
  @Serialize(FacilityDto)
  @ApiOkResponse({ type: FacilityDto })
  findOne(@Param('id') id: number) {
    return this.facilityService.findOne(id);
  }

  @Get()
  @ApiOkResponse({ type: [FacilityPaginatedDto] })
  findMany(@Query() paginationDto: PaginationDto) {
    return this.facilityService.findMany(paginationDto);
  }

  @Post()
  @Serialize(FacilityDto)
  @ApiCreatedResponse({ type: FacilityDto })
  create(@Body() dto: CreateFacilityDto) {
    return this.facilityService.create(dto);
  }

  @Patch(':id')
  @Serialize(FacilityDto)
  @ApiOkResponse({ type: FacilityDto })
  update(@Body() dto: UpdateFacilityDto, @Param('id') id: number) {
    return this.facilityService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.facilityService.delete(id);
  }
}
