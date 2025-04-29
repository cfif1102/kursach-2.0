import { useState } from 'react';

export const useModalControls = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    handleClose,
    handleOpen,
  };
};
