import { IFacility } from '@@types';

export interface EditFacilityProps {
  onClose: () => void;
  isOpen: boolean;
  item: IFacility;
}
