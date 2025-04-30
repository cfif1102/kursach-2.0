import { useMutation } from '@tanstack/react-query';

import { ICreateFacility, IFacility } from '@@types';

import { api, queryClient } from '../query-client';

export const useCreateFacility = () =>
  useMutation<IFacility, Error, ICreateFacility>({
    mutationFn: (payload) => api.post('/facilities', payload).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
    },
  });

export const useUpdateFacility = () =>
  useMutation<IFacility, Error, { id: number; data: ICreateFacility }>({
    mutationFn: ({ id, data }) => api.patch(`/facilities/${id}`, data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      queryClient.invalidateQueries({ queryKey: ['facilities', variables.id] });
    },
  });

export const useDeleteFacility = () =>
  useMutation<void, Error, number>({
    mutationFn: (id) => api.delete(`/facilities/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      queryClient.invalidateQueries({ queryKey: ['facilities', id] });
    },
  });
