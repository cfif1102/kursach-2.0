import { Module } from '@nestjs/common';
import { LicenseeService } from './licensee.service';
import { LicenseeController } from './licensee.controller';
import { CustomerModule } from '@customer/customer.module';

@Module({
  controllers: [LicenseeController],
  providers: [LicenseeService],
  exports: [LicenseeModule],
  imports: [CustomerModule],
})
export class LicenseeModule {}
