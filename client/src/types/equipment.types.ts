import { IPagination } from './common.types';

export interface IEquipment {
  id: number;
  name: string;
}

export interface ICreateEquipment {
  name: string;
}

export interface IEquipmentSearch extends IPagination {
  name: string;
}
