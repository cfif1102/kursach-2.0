import { IContract } from '@@types';

export interface EditContractProps {
  onClose: () => void;
  isOpen: boolean;
  item: IContract;
}
