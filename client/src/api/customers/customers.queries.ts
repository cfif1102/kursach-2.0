import { ICustomer, IPaginated, IPagination } from '@@types';
import { api } from '@api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useCustomer = (id: number) =>
  useQuery<ICustomer>({
    queryKey: ['customers', id],
    queryFn: () => api.get(`/customers/${id}`).then((res) => res.data),
  });

export const useCustomers = (
  params: IPagination,
  options?: UseQueryOptions<IPaginated<ICustomer>>,
) =>
  useQuery<IPaginated<ICustomer>>({
    queryKey: ['customers', params],
    queryFn: () => api.get('/customers', { params }).then((res) => res.data),
    ...options,
  });
