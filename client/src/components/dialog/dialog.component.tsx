import { FC } from 'react';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog as MuiDialog,
} from '@mui/material';

import { DialogProps } from './dialog.types';

export const Dialog: FC<DialogProps> = ({ onOk, onDecline, open, onClose, title, text }) => {
  return (
    <MuiDialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDecline}>Нет</Button>
        <Button onClick={onOk}>Да</Button>
      </DialogActions>
    </MuiDialog>
  );
};
