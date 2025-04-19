import { Module } from '@nestjs/common';
import { LicenseeService } from './licensee.service';
import { LicenseeController } from './licensee.controller';

@Module({
  controllers: [LicenseeController],
  providers: [LicenseeService],
})
export class LicenseeModule {}
