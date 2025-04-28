import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LicenseeService } from './licensee.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LicenseeDto } from './dto/licensee.dto';
import { CreateLicenseeDto } from './dto/create-licensee.dto';
import { UpdateLicenseeDto } from './dto/update-licensee.dto';
import { Serialize } from 'src/common/decorators/serialize.decorator';

@ApiTags('Licensee')
@Controller('licensees')
export class LicenseeController {
  constructor(private readonly licenseeService: LicenseeService) {}

  @Get(':id')
  @Serialize(LicenseeDto)
  @ApiOkResponse({ type: LicenseeDto })
  findOne(@Param('id') id: number) {
    return this.licenseeService.findOne(id);
  }

  @Get()
  @Serialize(LicenseeDto)
  @ApiOkResponse({ type: [LicenseeDto] })
  findMany() {
    return this.licenseeService.findMany();
  }

  @Post()
  @Serialize(LicenseeDto)
  @ApiCreatedResponse({ type: LicenseeDto })
  create(@Body() dto: CreateLicenseeDto) {
    return this.licenseeService.create(dto);
  }

  @Patch(':id')
  @Serialize(LicenseeDto)
  @ApiOkResponse({ type: LicenseeDto })
  update(@Body() dto: UpdateLicenseeDto, @Param('id') id: number) {
    return this.licenseeService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.licenseeService.delete(id);
  }
}
