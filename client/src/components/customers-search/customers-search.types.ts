import { ICustomer } from '@@types';

export interface CustomerSearchProps {
  open: boolean;
  onClose: () => void;
  onChange: (customer: ICustomer) => void;
}
