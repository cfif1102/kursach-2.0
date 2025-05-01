import { IFacility } from '@@types';

export interface FacilitiesSearchProps {
  open: boolean;
  onClose: () => void;
  onChange: (facility: IFacility) => void;
}
