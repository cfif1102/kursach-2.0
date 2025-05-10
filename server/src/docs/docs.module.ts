import { Module } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsController } from './docs.controller';
import { FacilityModule } from '@facility/facility.module';
import { LicenseeModule } from '@licensee/licensee.module';
import { CustomerModule } from '@customer/customer.module';
import { EquipmentModule } from '@equipment/equipment.module';
import { ContractModule } from '@contract/contract.module';

@Module({
  controllers: [DocsController],
  providers: [DocsService],
  imports: [FacilityModule, LicenseeModule, CustomerModule, EquipmentModule, ContractModule],
})
export class DocsModule {}
