import { UserFieldsNames } from '@features/user-form/constants/fields-names';
import { UserFieldValues } from '@features/user-form/types/fields.interfaces';

export const setFormData = (formData: FormData, data: UserFieldValues) => {
  formData.append(UserFieldsNames.SURNAME, data.surname);
  formData.append(UserFieldsNames.EMAIL, data.email);
  formData.append(UserFieldsNames.AVATAR, data.avatar ? data.avatar[0] : '');
  formData.append(UserFieldsNames.PHONE, data.phone);
  formData.append(UserFieldsNames.LASTNAME, data.lastName);
  formData.append(UserFieldsNames.FIRSTNAME, data.firstName);
  formData.append(UserFieldsNames.BIRTHDAY, data.birthday);
};
