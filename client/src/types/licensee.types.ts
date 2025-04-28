import { ICustomer } from "./customer.types";

export interface ILicensee extends Pick<ICreateLicensee, "customerId"> {
  id: number;
  customer: ICustomer;
}

export interface ICreateLicensee {
  name: string;
  customerId: number;
}
