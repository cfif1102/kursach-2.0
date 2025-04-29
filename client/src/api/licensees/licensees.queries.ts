import { ILicensee, IPaginated, IPagination } from '@@types';
import { api } from '@api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useLicensee = (id: number) =>
  useQuery<ILicensee>({
    queryKey: ['licensees', id],
    queryFn: () => api.get(`/licensees/${id}`).then((res) => res.data),
  });

export const useLicensees = (
  params: IPagination,
  options?: UseQueryOptions<IPaginated<ILicensee>>,
) =>
  useQuery<IPaginated<ILicensee>>({
    queryKey: ['licensees', params],
    queryFn: () => api.get('/licensees', { params }).then((res) => res.data),
    ...options,
  });
