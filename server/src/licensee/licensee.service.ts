import { Injectable } from '@nestjs/common';
import { Licensee } from './entities/licensee.entity';
import { CreateLicenseeDto } from './dto/create-licensee.dto';
import { UpdateLicenseeDto } from './dto/update-licensee.dto';
import { CustomerService } from '@customer/customer.service';
import { Repository, DataSource } from 'typeorm';

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

  findMany() {
    return this.licenseeRepo.find({
      relations: {
        customer: true,
      },
    });
  }

  async create(dto: CreateLicenseeDto) {
    const { name, customerId } = dto;
    const customer = await this.customerService.findOne(customerId);

    const licenseePlain = this.licenseeRepo.create({ name, customer });

    return licenseePlain;
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
