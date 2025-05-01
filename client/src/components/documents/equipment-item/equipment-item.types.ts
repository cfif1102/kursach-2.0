export interface EquipmentItemProps {
  name: string;
  count: number;
  end?: string;
  onDelete: () => void;
  onChange: () => void;
}
