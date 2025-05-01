import { ChangeEvent, FC, useState } from 'react';

import { TextField, InputAdornment, IconButton } from '@mui/material';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { SearchInputProps } from './search-input.types';

export const SearchInput: FC<SearchInputProps> = ({ sx, label, onChange }) => {
  const [value, setValue] = useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    onChange(value);
  };

  const handleSearchFlush = () => {
    setValue('');

    onChange('');
  };

  return (
    <TextField
      label={label}
      size="small"
      sx={sx}
      value={value}
      onChange={handleSearchChange}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearchFlush}>
                <CloseOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
