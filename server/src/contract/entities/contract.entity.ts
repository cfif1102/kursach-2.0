import { Customer } from '@customer/entities/customer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contractNumber: string;

  @ManyToOne(() => Customer, (customer) => customer.contracts)
  customer: Customer;

  @CreateDateColumn()
  date: Date;
}
