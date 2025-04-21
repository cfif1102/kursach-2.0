import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { CustomerService } from '@customer/customer.service';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractService {
  private readonly contractRepo: Repository<Contract>;

  constructor(
    dataSource: DataSource,
    private readonly customerService: CustomerService,
  ) {
    this.contractRepo = dataSource.getRepository(Contract);
  }

  findOne(id: number) {
    return this.contractRepo.findOneOrFail({
      where: { id },
      relations: {
        customer: true,
      },
    });
  }

  findMany() {
    return this.contractRepo.find({
      relations: {
        customer: true,
      },
    });
  }

  async create(dto: CreateContractDto) {
    const { contractNumber, customerId } = dto;
    const customer = await this.customerService.findOne(customerId);

    const contractPlain = this.contractRepo.create({
      contractNumber,
      customer,
    });

    return this.contractRepo.save(contractPlain);
  }

  async update(id: number, dto: UpdateContractDto) {
    const { contractNumber, customerId } = dto;
    const contract = await this.findOne(id);

    Object.assign(contract, { contractNumber });

    if (customerId) {
      const customer = await this.customerService.findOne(id);

      contract.customer = customer;
    }

    return this.contractRepo.save(contract);
  }

  async delete(id: number) {
    const contract = await this.findOne(id);

    await this.contractRepo.remove(contract);
  }
}
