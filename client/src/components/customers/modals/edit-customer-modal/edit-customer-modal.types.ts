import { ICustomer } from '@@types';

export interface EditCustomerProps {
  onClose: () => void;
  isOpen: boolean;
  item: ICustomer;
}
