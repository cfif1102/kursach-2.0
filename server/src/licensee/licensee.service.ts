import { Injectable } from '@nestjs/common';
import { Licensee } from './entities/licensee.entity';
import { CreateLicenseeDto } from './dto/create-licensee.dto';
import { UpdateLicenseeDto } from './dto/update-licensee.dto';
import { CustomerService } from '@customer/customer.service';
import { Repository, DataSource } from 'typeorm';
import { LicenseePaginatedDto } from './dto/licensee-paginated.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class LicenseeService {
  private readonly licenseeRepo: Repository<Licensee>;

  constructor(
    dataSource: DataSource,
    private readonly customerService: CustomerService,
  ) {
    this.licenseeRepo = dataSource.getRepository(Licensee);
  }

  findOne(id: number) {
    return this.licenseeRepo.findOneOrFail({
      where: { id },
      relations: {
        customer: true,
      },
    });
  }

  findByCustomer(customerId: number) {
    return this.licenseeRepo.findOneOrFail({
      where: {
        customer: {
          id: customerId,
        },
      },
    });
  }

  async findMany(dto: PaginationDto) {
    const { pageSize, offset } = dto;
    const [items, count] = await this.licenseeRepo.findAndCount({
      skip: offset,
      take: pageSize,
      relations: {
        customer: true,
      },
    });

    return new LicenseePaginatedDto(items, count, dto);
  }

  async create(dto: CreateLicenseeDto) {
    const { name, customerId } = dto;
    const customer = await this.customerService.findOne(customerId);

    const licenseePlain = this.licenseeRepo.create({ name, customer });

    return this.licenseeRepo.save(licenseePlain);
  }

  async update(id: number, dto: UpdateLicenseeDto) {
    const { name, customerId } = dto;
    const licensee = await this.findOne(id);

    Object.assign(licensee, { name });

    if (customerId) {
      const customer = await this.customerService.findOne(customerId);

      licensee.customer = customer;
    }

    return this.licenseeRepo.save(licensee);
  }

  async delete(id: number) {
    const licensee = await this.findOne(id);

    await this.licenseeRepo.remove(licensee);
  }
}
