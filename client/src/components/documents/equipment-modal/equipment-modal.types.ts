export interface EquipmentModalProps {
  handleSuccess: (value: number) => void;
  handleClose: () => void;
  open: boolean;
  mode: 'edit' | 'add';
  value: number;
  label: string;
}
