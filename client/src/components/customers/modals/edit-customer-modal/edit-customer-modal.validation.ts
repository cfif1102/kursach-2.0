import * as yup from 'yup';

export interface EditCustomerFormData {
  name: string;
}

export const EditCustomerSchema = yup.object({
  name: yup.string().required('Обязательное поле'),
});
