import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { CustomerModule } from '@customer/customer.module';

@Module({
  controllers: [ContractController],
  providers: [ContractService],
  imports: [CustomerModule],
})
export class ContractModule {}
