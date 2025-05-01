import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { IFacility, IFacilitySearch, IPaginated, IPagination } from '@@types';
import { api } from '@api';

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

export const useFacilitiesSearch = (
  params: IFacilitySearch,
  options?: UseQueryOptions<IPaginated<IFacility>>,
) =>
  useQuery<IPaginated<IFacility>>({
    queryKey: ['facilities-search', params],
    queryFn: () => api.get('/facilities/search', { params }).then((res) => res.data),
    ...options,
  });
