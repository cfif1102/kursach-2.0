import { Customer } from '@customer/entities/customer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Licensee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Customer, (customer) => customer.licensees)
  customer: Customer;
}
