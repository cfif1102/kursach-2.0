import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerPaginatedDto } from './dto/customer-paginated.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CustomerService {
  private readonly customerRepo: Repository<Customer>;

  constructor(dataSource: DataSource) {
    this.customerRepo = dataSource.getRepository(Customer);
  }

  findOne(id: number) {
    return this.customerRepo.findOneOrFail({ where: { id } });
  }

  async findMany(dto: PaginationDto) {
    const { pageSize, offset } = dto;
    const [items, count] = await this.customerRepo.findAndCount({
      skip: offset,
      take: pageSize,
    });

    return new CustomerPaginatedDto(items, count, dto);
  }

  create(dto: CreateCustomerDto) {
    const customerPlain = this.customerRepo.create(dto);

    return this.customerRepo.save(customerPlain);
  }

  async update(id: number, dto: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    Object.assign(customer, dto);

    return this.customerRepo.save(customer);
  }

  async delete(id: number) {
    const customer = await this.findOne(id);

    await this.customerRepo.remove(customer);
  }
}
