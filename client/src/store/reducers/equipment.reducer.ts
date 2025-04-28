import { IEquipment, Thunk, ThunkInit } from '@@types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createEquipment,
  deleteEquipment,
  findEquipments,
  loadEquipments,
  updateEquipment,
} from '@thunks';

interface IState {
  equipment?: IEquipment;
  equipments: IEquipment[];
  createThunk: Thunk;
  updateThunk: Thunk;
  deleteThunk: Thunk;
  loadThunk: Thunk;
  findMany: Thunk;
  currentPage: number;
  nextPage?: number;
  prevPage?: number;
}

const state: IState = {
  equipments: [],
  loadThunk: ThunkInit(),
  createThunk: ThunkInit(),
  updateThunk: ThunkInit(),
  deleteThunk: ThunkInit(),
  findMany: ThunkInit(),
  currentPage: 1,
};

export const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: state,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadEquipments.pending, (state) => {
        state.loadThunk.status = 'pending';
      })
      .addCase(loadEquipments.fulfilled, (state, action) => {
        state.loadThunk.status = 'succeeded';

        const {
          equipments: { items, nextPage, prevPage },
          currentPage,
        } = action.payload;

        state.equipments = [...state.equipments, ...items];
        state.nextPage = nextPage;
        state.prevPage = prevPage;
        state.currentPage = currentPage;
      })
      .addCase(loadEquipments.rejected, (state, action) => {
        state.loadThunk.status = 'rejected';
        state.loadThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(findEquipments.pending, (state) => {
        state.findMany.status = 'pending';
      })
      .addCase(findEquipments.fulfilled, (state, action) => {
        state.findMany.status = 'succeeded';

        const { items, nextPage, prevPage } = action.payload;

        state.equipments = items;
        state.nextPage = nextPage;
        state.prevPage = prevPage;
      })
      .addCase(findEquipments.rejected, (state, action) => {
        state.findMany.status = 'rejected';
        state.findMany.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(createEquipment.pending, (state) => {
        state.createThunk.status = 'pending';
      })
      .addCase(createEquipment.fulfilled, (state, action) => {
        state.createThunk.status = 'succeeded';

        const result = action.payload;

        state.equipments.push(result);
      })
      .addCase(createEquipment.rejected, (state, action) => {
        state.createThunk.status = 'rejected';
        state.createThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(updateEquipment.pending, (state) => {
        state.updateThunk.status = 'pending';
      })
      .addCase(updateEquipment.fulfilled, (state, action) => {
        state.updateThunk.status = 'succeeded';

        const result = action.payload;

        const equipment = state.equipments.findIndex((eq) => eq.id === result.id);

        Object.assign(equipment, result);
      })
      .addCase(updateEquipment.rejected, (state, action) => {
        state.updateThunk.status = 'rejected';
        state.updateThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(deleteEquipment.pending, (state) => {
        state.deleteThunk.status = 'pending';
      })
      .addCase(deleteEquipment.fulfilled, (state, action) => {
        state.deleteThunk.status = 'succeeded';

        const result = action.payload;

        state.equipments = state.equipments.filter((eq) => eq.id !== result);
      })
      .addCase(deleteEquipment.rejected, (state, action) => {
        state.deleteThunk.status = 'rejected';
        state.deleteThunk.error = action.error.message ?? 'Unknown Error';
      });
  },
});
