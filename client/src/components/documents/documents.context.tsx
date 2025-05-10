import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

import { IFacility, IEquipment } from '@@types';

import { DocEnums } from './documents.constants';
import { DocumentContextType } from './documents.types';

export const DocumentsContext = createContext<DocumentContextType>({} as DocumentContextType);
export const useDocumentsContext = () => useContext(DocumentsContext);

export const DocumentsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [facilityText, setFacilityText] = useState('');
  const [facility, setFacility] = useState<IFacility | null>(null);
  const [equipments, setEquipments] = useState<{ data: IEquipment; count: number; end?: string }[]>(
    [],
  );
  const [equipment, setEquipment] = useState<{
    item: IEquipment;
    mode: 'add' | 'edit';
    value: number;
    end?: string;
  } | null>(null);

  const [docType, setDocType] = useState<DocEnums>(DocEnums.act);

  return (
    <DocumentsContext.Provider
      value={{
        facilityText,
        setFacilityText,
        facility,
        setFacility,
        equipments,
        setEquipments,
        equipment,
        setEquipment,
        docType,
        setDocType,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
