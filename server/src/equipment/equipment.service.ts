import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { Equipment } from './entities/equipment.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EquipmentPaginatedDto } from './dto/equipment-paginated.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class EquipmentService {
  private readonly equipmentRepo: Repository<Equipment>;

  constructor(dataSource: DataSource) {
    this.equipmentRepo = dataSource.getRepository(Equipment);
  }

  findOne(id: number) {
    return this.equipmentRepo.findOneOrFail({ where: { id } });
  }

  findByIds(ids: number[]) {
    return this.equipmentRepo.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findMany(paginationDto: PaginationDto) {
    const { pageSize, offset } = paginationDto;
    const [items, count] = await this.equipmentRepo.findAndCount({
      skip: offset,
      take: pageSize,
    });

    return new EquipmentPaginatedDto(items, count, paginationDto);
  }

  create(dto: CreateEquipmentDto) {
    const equipmentPlain = this.equipmentRepo.create(dto);

    return this.equipmentRepo.save(equipmentPlain);
  }

  async update(id: number, dto: UpdateEquipmentDto) {
    const equipment = await this.findOne(id);

    Object.assign(equipment, dto);

    console.log(equipment);

    return this.equipmentRepo.save(equipment);
  }

  async delete(id: number) {
    const equipment = await this.findOne(id);

    await this.equipmentRepo.remove(equipment);
  }
}
