import { API_URL } from '../../config';
import { axios } from '../../lib/axios';

const getUserData = async () => {
        const response = await axios.get(`${API_URL}/auth/profile`);
        return await response;
     
}
export {
    getUserData
};
