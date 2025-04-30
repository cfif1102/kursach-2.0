import { useMutation } from '@tanstack/react-query';

import { IEquipment, ICreateEquipment } from '@@types';

import { api, queryClient } from '../query-client';

export const useCreateEquipment = () =>
  useMutation<IEquipment, Error, ICreateEquipment>({
    mutationFn: (payload) => api.post('/equipments', payload).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipments'] });
      queryClient.invalidateQueries({ queryKey: ['equipments-search'] });
    },
  });

export const useUpdateEquipment = () =>
  useMutation<IEquipment, Error, { id: number; data: ICreateEquipment }>({
    mutationFn: ({ id, data }) => api.patch(`/equipments/${id}`, data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['equipments'] });
      queryClient.invalidateQueries({ queryKey: ['equipments', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['equipments-search'] });
    },
  });

export const useDeleteEquipment = () =>
  useMutation<void, Error, number>({
    mutationFn: (id) => api.delete(`/equipments/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['equipments'] });
      queryClient.invalidateQueries({ queryKey: ['equipments', id] });
      queryClient.invalidateQueries({ queryKey: ['equipments-search'] });
    },
  });
