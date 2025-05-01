import { SxProps } from '@mui/material';

import { IFacility } from '@@types';

export interface FacilitySelectProps {
  facility: IFacility | null;
  onChange: (data: IFacility) => void;
  sx?: SxProps;
}
