import * as yup from 'yup';

export interface AddFacilityFormData {
  name: string;
  address: string;
  customerId: number;
}

export const AddFacilitySchema = yup.object({
  name: yup.string().required('Обязательное поле'),
  address: yup.string().required('Обязательное поле'),
  customerId: yup
    .number()
    .typeError('Необходимо выбрать заказчика')
    .min(1, 'Необходимо выбрать заказчика')
    .required('Заказчик обязателен'),
});
