import * as yup from 'yup';

export interface EditLicenseeFormData {
  name: string;
  customerId: number;
}

export const EditLicenseeSchema = yup.object({
  name: yup.string().required('Обязательное поле'),
  customerId: yup
    .number()
    .typeError('Необходимо выбрать заказчика')
    .min(1, 'Необходимо выбрать заказчика')
    .required('Заказчик обязателен'),
});
