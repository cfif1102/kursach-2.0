import { FC } from 'react';

import { Button as ButtonMui } from '@mui/material';

import { FILLED_BUTTON_SX } from './button.constants';
import { ButtonProps } from './button.types';

export const Button: FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  variant = 'outlined',
  sx = FILLED_BUTTON_SX,
  type = 'button',
}) => {
  return (
    <ButtonMui variant={variant} endIcon={text ? icon : null} onClick={onClick} sx={sx} type={type}>
      {text ?? icon}
    </ButtonMui>
  );
};
