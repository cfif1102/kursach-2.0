export interface IEquipmentPassportData {
  id: number;
  end: string;
  amount: number;
}

export type IEquipmentActData = Omit<IEquipmentPassportData, 'end'>;

export interface ICreatePassportDocument {
  equipments: IEquipmentPassportData[];
  objectId: number;
}

export interface ICreateActDocument {
  equipments: IEquipmentActData[];
  objectId: number;
}

export interface ICreateScheduleDocument {
  schedule: number[][];
  facilityId: number;
}
