import { useMutation } from '@tanstack/react-query';

import { ICustomer, ICreateCustomer } from '@@types';

import { api, queryClient } from '../query-client';

export const useCreateCustomer = () =>
  useMutation<ICustomer, Error, ICreateCustomer>({
    mutationFn: (payload) => api.post('/customers', payload).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customers-search'] });
    },
  });

export const useUpdateCustomer = () =>
  useMutation<ICustomer, Error, { id: number; data: ICreateCustomer }>({
    mutationFn: ({ id, data }) => api.patch(`/customers/${id}`, data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customers-search'] });
      queryClient.invalidateQueries({ queryKey: ['customers', variables.id] });
    },
  });

export const useDeleteCustomer = () =>
  useMutation<void, Error, number>({
    mutationFn: (id) => api.delete(`/customers/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customers-search'] });
      queryClient.invalidateQueries({ queryKey: ['customers', id] });
    },
  });
