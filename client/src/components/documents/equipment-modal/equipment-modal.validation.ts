import * as yup from 'yup';

export interface EquipmentModalFormData {
  value: number;
}

export const EquipmentModalSchema = yup.object({
  value: yup
    .number()
    .typeError('Поле должно быть числом')
    .positive('Поле должно быть положительным')
    .required('Обязательное поле'),
});
