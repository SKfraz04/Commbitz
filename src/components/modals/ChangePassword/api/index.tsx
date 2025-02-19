import { API_URL } from '../../../../config';
import { axios } from '../../../../lib/axios';
import { ChangePasswordPayload, ChangePasswordResponse, } from '../interface';

const UpdatePassword = async (values: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
    return axios.put(`${API_URL}/auth/profile`, values);
}
export {
    UpdatePassword
};