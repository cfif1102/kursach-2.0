import { Customer } from '@customer/entities/customer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Facility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @ManyToOne(() => Customer, (customer) => customer.facilities)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
}
