import { Contract } from '@contract/entities/contract.entity';
import { Facility } from '@facility/entities/facility.entity';
import { Licensee } from '@licensee/entities/licensee.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Licensee, (licensee) => licensee.customer)
  licensees: Licensee[];

  @OneToMany(() => Facility, (facility) => facility.customer)
  facilities: Facility[];

  @OneToMany(() => Contract, (contract) => contract.customer)
  contracts: Contract[];
}
