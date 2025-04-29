export interface DialogProps {
  onOk: () => void;
  onDecline: () => void;
  open: boolean;
  onClose: () => void;
  title: string;
  text: string;
}
