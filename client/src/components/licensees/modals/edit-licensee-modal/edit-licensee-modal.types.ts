import { ILicensee } from '@@types';

export interface EditLicenseeProps {
  onClose: () => void;
  isOpen: boolean;
  item: ILicensee;
}
