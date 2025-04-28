import { ICreateEquipment, IEquipment, IPaginated, IPagination } from '@@types';
import { api, query } from './api';

export const findOne = query(async (payload: number) => {
  const { data } = await api.get<IEquipment>(`/equipments/${payload}`);

  return data;
});

export const findMany = query(async (payload: IPagination) => {
  const { data } = await api.get<IPaginated<IEquipment>>(`/equipments`, { params: payload });

  return data;
});

export const createEquipment = query(async (payload: ICreateEquipment) => {
  const { data } = await api.post<IEquipment>('/equipments', payload);

  return data;
});

export const updateEquipment = query(async (payload: { data: ICreateEquipment; id: number }) => {
  const { data } = await api.patch<IEquipment>(`/equipments/${payload.id}`, payload.data);

  return data;
});

export const deleteEquipment = query(async (payload: number) => {
  await api.delete(`/equipments/${payload}`);
});
