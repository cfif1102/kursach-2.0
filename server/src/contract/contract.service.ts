import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { CustomerService } from '@customer/customer.service';
import { UpdateContractDto } from './dto/update-contract.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ContractPaginatedDto } from './dto/contract-paginated.dto';

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

  async findMany(dto: PaginationDto) {
    const { pageSize, offset } = dto;
    const [items, count] = await this.contractRepo.findAndCount({
      skip: offset,
      take: pageSize,
      relations: {
        customer: true,
      },
    });

    return new ContractPaginatedDto(items, count, dto);
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
