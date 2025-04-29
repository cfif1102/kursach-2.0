import { IEquipment, IPaginated, IPagination } from '@@types';
import { api } from '@api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

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
