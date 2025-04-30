import { useMutation } from '@tanstack/react-query';

import { IContract, ICreateContract } from '@@types';

import { api, queryClient } from '../query-client';

export const useCreateContract = () =>
  useMutation<IContract, Error, ICreateContract>({
    mutationFn: (payload) => api.post('/contracts', payload).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    },
  });

export const useUpdateContract = () =>
  useMutation<IContract, Error, { id: number; data: ICreateContract }>({
    mutationFn: ({ id, data }) => api.patch(`/contracts/${id}`, data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      queryClient.invalidateQueries({ queryKey: ['contracts', variables.id] });
    },
  });

export const useDeleteContract = () =>
  useMutation<void, Error, number>({
    mutationFn: (id) => api.delete(`/contracts/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      queryClient.invalidateQueries({ queryKey: ['contracts', id] });
    },
  });
