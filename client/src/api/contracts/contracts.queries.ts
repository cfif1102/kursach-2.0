import { IContract, IPaginated, IPagination } from '@@types';
import { api } from '@api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useContract = (id: number) =>
  useQuery<IContract>({
    queryKey: ['contracts', id],
    queryFn: () => api.get(`/contracts/${id}`).then((res) => res.data),
  });

export const useContracts = (
  params: IPagination,
  options?: UseQueryOptions<IPaginated<IContract>>,
) =>
  useQuery<IPaginated<IContract>>({
    queryKey: ['contracts', params],
    queryFn: () => api.get('/contracts', { params }).then((res) => res.data),
    ...options,
  });
