import { ICustomer } from './customer.types';

export interface IContract extends Omit<ICreateContract, 'customerId'> {
  id: number;
  customer: ICustomer;
}

export interface ICreateContract {
  contractNumber: string;
  customerId: number;
}
