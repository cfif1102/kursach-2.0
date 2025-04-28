import { createAppAsyncThunk, ICreateEquipment, IPagination } from '@@types';
import { equipmentApi } from '@api';

export const findEquipment = createAppAsyncThunk('equipment/findOne', async (data: number) => {
  const equipment = await equipmentApi.findOne(data);

  return equipment;
});

export const findEquipments = createAppAsyncThunk(
  'equipment/findMany',
  async (data: IPagination) => {
    const equipments = await equipmentApi.findMany(data);

    return equipments;
  },
);

export const loadEquipments = createAppAsyncThunk(
  'equipment/loadEquipment',
  async (data: IPagination) => {
    const equipments = await equipmentApi.findMany(data);

    return { equipments, currentPage: data.page };
  },
);

export const createEquipment = createAppAsyncThunk(
  'equipment/create',
  async (data: ICreateEquipment) => {
    const equipment = await equipmentApi.createEquipment(data);

    return equipment;
  },
);

export const updateEquipment = createAppAsyncThunk(
  'equipment/update',
  async (data: { id: number; data: ICreateEquipment }) => {
    const equipment = await equipmentApi.updateEquipment(data);

    return equipment;
  },
);

export const deleteEquipment = createAppAsyncThunk('equipment/delete', async (data: number) => {
  await equipmentApi.deleteEquipment(data);

  return data;
});
