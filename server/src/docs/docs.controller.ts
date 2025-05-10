import { Body, Controller, Post, StreamableFile } from '@nestjs/common';
import { DocsService } from './docs.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateActDto } from './dto/create-act.dto';
import { CreatePassportDto } from './dto/create-passport.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@ApiTags('Docs')
@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Post('create-schedule')
  async generateSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    const { buffer, name } = await this.docsService.createScheduleDocument(createScheduleDto);

    return new StreamableFile(buffer, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      disposition: `attachment; filename*=UTF-8''${encodeURIComponent(name)}`,
    });
  }

  @Post('create-act')
  async generateAct(@Body() createActDto: CreateActDto) {
    const { buffer, name } = await this.docsService.createActDocument(createActDto);

    return new StreamableFile(buffer, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      disposition: `attachment; filename*=UTF-8''${encodeURIComponent(name)}`,
    });
  }

  @Post('create-passport')
  async generatePassport(@Body() createPassportDto: CreatePassportDto) {
    const { buffer, name } = await this.docsService.createPassportDocument(createPassportDto);

    return new StreamableFile(buffer, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      disposition: `attachment; filename*=UTF-8''${encodeURIComponent(name)}`,
    });
  }
}
