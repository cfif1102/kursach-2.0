import * as yup from 'yup';
import { InferType } from 'yup';

export const EquipmentModalSchema = yup.object({
  value: yup
    .number()
    .typeError('Поле должно быть числом')
    .positive('Поле должно быть положительным')
    .required('Обязательное поле'),
  end: yup.string().optional().min(10, 'Минимум 10 символов'),
});

export type EquipmentModalFormData = InferType<typeof EquipmentModalSchema>;
