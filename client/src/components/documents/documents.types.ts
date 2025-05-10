import { Dispatch, SetStateAction } from 'react';

import { IFacility, IEquipment } from '@@types';

import { DocEnums } from './documents.constants';

export interface DocumentContextType {
  docType: DocEnums;
  setDocType: Dispatch<SetStateAction<DocEnums>>;
  facilityText: string;
  setFacilityText: Dispatch<SetStateAction<string>>;
  facility: IFacility | null;
  setFacility: Dispatch<SetStateAction<IFacility | null>>;
  equipments: { data: IEquipment; count: number; end?: string }[];
  setEquipments: Dispatch<SetStateAction<{ data: IEquipment; count: number; end?: string }[]>>;
  equipment: {
    item: IEquipment;
    mode: 'add' | 'edit';
    value: number;
    end?: string;
  } | null;
  setEquipment: Dispatch<
    SetStateAction<{
      item: IEquipment;
      mode: 'add' | 'edit';
      value: number;
      end?: string;
    } | null>
  >;
}
