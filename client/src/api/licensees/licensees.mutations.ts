import { useMutation } from '@tanstack/react-query';

import { ICreateLicensee, ILicensee } from '@@types';

import { api, queryClient } from '../query-client';

export const useCreateLicensee = () =>
  useMutation<ILicensee, Error, ICreateLicensee>({
    mutationFn: (payload) => api.post('/licensees', payload).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['licensees'] });
    },
  });

export const useUpdateLicensee = () =>
  useMutation<ILicensee, Error, { id: number; data: ICreateLicensee }>({
    mutationFn: ({ id, data }) => api.patch(`/licensees/${id}`, data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['licensees'] });
      queryClient.invalidateQueries({ queryKey: ['licensees', variables.id] });
    },
  });

export const useDeleteLicensee = () =>
  useMutation<void, Error, number>({
    mutationFn: (id) => api.delete(`/licensees/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['licensees'] });
      queryClient.invalidateQueries({ queryKey: ['licensees', id] });
    },
  });
