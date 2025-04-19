import { config } from '@config';
import { ContractModule } from '@contract/contract.module';
import { CustomerModule } from '@customer/customer.module';
import { EquipmentModule } from '@equipment/equipment.module';
import { FacilityModule } from '@facility/facility.module';
import { LicenseeModule } from '@licensee/licensee.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormModule } from '@typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeormModule,
    CustomerModule,
    LicenseeModule,
    FacilityModule,
    EquipmentModule,
    ContractModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
