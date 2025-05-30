import { ReactElement, MouseEvent } from 'react';

import { SxProps } from '@mui/material';

export interface ButtonProps {
  variant?: 'text' | 'contained' | 'outlined';
  text?: string;
  icon?: ReactElement;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  sx?: SxProps;
  type?: 'button' | 'reset' | 'submit';
}
