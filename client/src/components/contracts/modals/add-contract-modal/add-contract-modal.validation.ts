import * as yup from 'yup';

export interface AddContractFormData {
  contractNumber: string;
  customerId: number;
}

export const AddContractSchema = yup.object({
  contractNumber: yup.string().required('Обязательное поле'),
  customerId: yup
    .number()
    .typeError('Необходимо выбрать заказчика')
    .min(1, 'Необходимо выбрать заказчика')
    .required('Заказчик обязателен'),
});
