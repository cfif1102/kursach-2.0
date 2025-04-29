import { IFacility, IPaginated, IPagination } from '@@types';
import { api } from '@api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFacility = (id: number) =>
  useQuery<IFacility>({
    queryKey: ['facilities', id],
    queryFn: () => api.get(`/facilities/${id}`).then((res) => res.data),
  });

export const useFacilities = (
  params: IPagination,
  options?: UseQueryOptions<IPaginated<IFacility>>,
) =>
  useQuery<IPaginated<IFacility>>({
    queryKey: ['facilities', params],
    queryFn: () => api.get('/facilities', { params }).then((res) => res.data),
    ...options,
  });
