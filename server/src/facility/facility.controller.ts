import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FacilityService } from './facility.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FacilityDto } from './dto/facility.dto';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@ApiTags('Facility')
@Controller('facilities')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Get(':id')
  @ApiOkResponse({ type: FacilityDto })
  findOne(@Param('id') id: number) {
    return this.facilityService.findOne(id);
  }

  @Get()
  @ApiOkResponse({ type: [FacilityDto] })
  findMany() {
    return this.facilityService.findMany();
  }

  @Post()
  @ApiCreatedResponse({ type: FacilityDto })
  create(@Body() dto: CreateFacilityDto) {
    return this.facilityService.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: FacilityDto })
  update(@Body() dto: UpdateFacilityDto, @Param('id') id: number) {
    return this.facilityService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.facilityService.delete(id);
  }
}
