import * as yup from 'yup';

export interface AddEquipmentFormData {
  name: string;
}

export const AddEquipmentSchema = yup.object({
  name: yup.string().required('Обязательное поле'),
});
