export interface EquipmentModalProps {
  handleSuccess: (value: number, end?: string) => void;
  handleClose: () => void;
  open: boolean;
  mode: 'edit' | 'add';
  value: number;
  end?: string;
  label: string;
}
