import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Facility } from './entities/facility.entity';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { CustomerService } from '@customer/customer.service';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@Injectable()
export class FacilityService {
  private readonly facilityRepo: Repository<Facility>;

  constructor(
    dataSource: DataSource,
    private readonly customerService: CustomerService,
  ) {
    this.facilityRepo = dataSource.getRepository(Facility);
  }

  findOne(id: number) {
    return this.facilityRepo.findOneOrFail({
      where: { id },
      relations: {
        customer: true,
      },
    });
  }

  findMany() {
    return this.facilityRepo.find({
      relations: {
        customer: true,
      },
    });
  }

  async create(dto: CreateFacilityDto) {
    const { name, address, customerId } = dto;
    const customer = await this.customerService.findOne(customerId);

    const facilityPlain = this.facilityRepo.create({ name, address, customer });

    return this.facilityRepo.save(facilityPlain);
  }

  async update(id: number, dto: UpdateFacilityDto) {
    const { name, address, customerId } = dto;
    const facility = await this.findOne(id);

    Object.assign(facility, { name, address });

    if (customerId) {
      const customer = await this.customerService.findOne(customerId);

      facility.customer = customer;
    }

    return this.facilityRepo.save(facility);
  }

  async delete(id: number) {
    const facility = await this.findOne(id);

    await this.facilityRepo.remove(facility);
  }
}
