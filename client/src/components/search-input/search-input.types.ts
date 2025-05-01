import { SxProps } from '@mui/material';

export interface SearchInputProps {
  sx?: SxProps;
  label: string;
  onChange: (value: string) => void;
}
