import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { IEquipment, IEquipmentSearch, IPaginated, IPagination } from '@@types';
import { api } from '@api';

export const useEquipment = (id: number) =>
  useQuery<IEquipment>({
    queryKey: ['equipments', id],
    queryFn: () => api.get(`/equipments/${id}`).then((res) => res.data),
  });

export const useEquipments = (
  params: IPagination,
  options?: UseQueryOptions<IPaginated<IEquipment>>,
) =>
  useQuery<IPaginated<IEquipment>>({
    queryKey: ['equipments', params],
    queryFn: () => api.get('/equipments', { params }).then((res) => res.data),
    ...options,
  });

export const useEquipmentsSearch = (
  params: IEquipmentSearch,
  options?: UseQueryOptions<IPaginated<IEquipment>>,
) =>
  useQuery<IPaginated<IEquipment>>({
    queryKey: ['equipments-search', params],
    queryFn: () => api.get('/equipments/search', { params }).then((res) => res.data),
    ...options,
  });
