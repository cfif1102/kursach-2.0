import * as yup from 'yup';

export interface EditEquipmentFormData {
  name: string;
}

export const EditEquipmentSchema = yup.object({
  name: yup.string().required('Обязательное поле'),
});
