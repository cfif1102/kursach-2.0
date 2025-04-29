import { IPagination } from './common.types';

export interface ICustomer {
  id: number;
  name: string;
}

export interface ICreateCustomer {
  name: string;
}

export interface ICustomerSearch extends IPagination {
  name: string;
}
