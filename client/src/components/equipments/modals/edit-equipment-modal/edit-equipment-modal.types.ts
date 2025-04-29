import { IEquipment } from '@@types';

export interface EditEquipmentProps {
  onClose: () => void;
  isOpen: boolean;
  item: IEquipment;
}
