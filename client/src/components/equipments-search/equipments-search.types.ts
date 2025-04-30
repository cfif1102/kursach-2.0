import { IEquipment } from '@@types';

export interface EquipmentsSearchProps {
  open: boolean;
  onClose: () => void;
  onChange: (equipment: IEquipment) => void;
}
