import { ICustomer } from './customer.types';

export interface IFacility extends Omit<ICreateFacility, 'customerId'> {
  id: number;
  customer: ICustomer;
}

export interface ICreateFacility {
  name: string;
  address: string;
  customerId: number;
}
