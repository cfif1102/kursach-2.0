import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { CustomerModule } from '@customer/customer.module';

@Module({
  controllers: [FacilityController],
  providers: [FacilityService],
  imports: [CustomerModule],
  exports: [FacilityService],
})
export class FacilityModule {}
