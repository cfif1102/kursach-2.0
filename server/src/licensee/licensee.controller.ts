import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LicenseeService } from './licensee.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LicenseeDto } from './dto/licensee.dto';
import { CreateLicenseeDto } from './dto/create-licensee.dto';
import { UpdateLicenseeDto } from './dto/update-licensee.dto';

@ApiTags('Licensee')
@Controller('licensees')
export class LicenseeController {
  constructor(private readonly licenseeService: LicenseeService) {}

  @Get(':id')
  @ApiOkResponse({ type: LicenseeDto })
  findOne(@Param('id') id: number) {
    return this.licenseeService.findOne(id);
  }

  @Get()
  @ApiOkResponse({ type: [LicenseeDto] })
  findMany() {
    return this.licenseeService.findMany();
  }

  @Post()
  @ApiCreatedResponse({ type: LicenseeDto })
  create(@Body() dto: CreateLicenseeDto) {
    return this.licenseeService.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: LicenseeDto })
  update(@Body() dto: UpdateLicenseeDto, @Param('id') id: number) {
    return this.licenseeService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.licenseeService.delete(id);
  }
}
