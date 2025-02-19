import { API_URL } from '../../../config';
import { axios } from '../../../lib/axios';
import { UserResponse } from '../interface';

const getUserData = async (): Promise<UserResponse> => {
    return await axios.get(`${API_URL}/auth/profile`);
}
export {
    getUserData
};