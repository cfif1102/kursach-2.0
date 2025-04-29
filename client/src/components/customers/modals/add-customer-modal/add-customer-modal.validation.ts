import * as yup from 'yup';

export interface AddCustomerFormData {
  name: string;
}

export const AddCustomerSchema = yup.object({
  name: yup.string().required('Обязательное поле'),
});
